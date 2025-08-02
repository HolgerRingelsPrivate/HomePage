'use client';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  InlineLoading,
} from '@carbon/react';
import { User, Help, Information } from '@carbon/icons-react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import React, { Component } from 'react';
import ModalLoggedInUser from './ModalLoggedInUser';
import ModalHelp from './ModalHelp';
import ModalInfo from './ModalInfo';
import * as I18n_RestClient from './../../modules/Common/backend/I18n_RestClient';
import * as UiParams_RestClient from './../../modules/Common/backend/uiParams_RestClient';
import ErrorDisplay from './../../modules/Common/app/ErrorDisplay';

import * as AppConstants from './../../modules/Common/AppConstants';
import * as AppFunctions from './../../modules/Common/AppFunctions';

import i18n from '@/singletons/i18n/I18n';
import uiParams from '@/singletons/uiParams/UIParams';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

import appSession from '@/singletons/session/AppSession';
import * as AppSessionData from '@/singletons/session/AppSessionData';

import WaitingForConfiguration from './../../modules/Common/app/WaitingForConfiguration';
import ApplicationHeaderMenu from './ApplicationHeaderMenu';

class ApplicationHeaderContent extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      indUserIsLoggedIn: false,
      timeStamp: null,
      i18nAndCfgReadResult: null,
      isModalLoggedInUserOpen: false,
      isModalHelpOpen: false,
      isModalInfoOpen: false,
    };
    eventBus.subscribe(
      AppEvents.DEFINITION.USER_LOOGED_IN,
      this.state.id,
      this.handleLogInEvent.bind(this)
    );
  }

  componentWillUnmount() {
    //Clean up:
    // - UNSUBCRIBE from eventBus
    eventBus.unsubscribe(AppEvents.DEFINITION.USER_LOOGED_IN, this.state.id);
    // - Clearing timers
  }
  handleLogInEvent() {
    this.setState({ indUserIsLoggedIn: true });
  }

  setIsModalLoggedInUserOpen(val) {
    this.setState({ isModalLoggedInUserOpen: val });
  }
  setIsModalHelpOpen(val) {
    this.setState({ isModalHelpOpen: val });
  }
  setIsModalInfoOpen(val) {
    this.setState({ isModalInfoOpen: val });
  }
  switchLocale(locale) {
    i18n.setLocaleToUse(locale);
    this.setState({ timeStamp: new Date() });

    //emit event indicating: I18N_CHANGED
    let event = AppEvents.DEFINITION.I18N_CHANGED;
    let payload = AppEvents.getPayLoadObject(event);
    eventBus.emit(event, payload);
  }

  async doLogOutAndResetData() {
    appSession.deleteData(AppSessionData.OBJECT_DEF.LOGGED_IN_USER);
    appSession.deleteData(AppSessionData.OBJECT_DEF.LOGGED_IN_USER_ROLES);
    appSession.deleteData(AppSessionData.OBJECT_DEF.JSON_WEB_TOKEN);

    AppFunctions.setUiToLoggedOut();
  }

  async captureConfiguration() {
    {
      let uiParamsCaptured = await UiParams_RestClient.captureUiParams();
      let i18nCaptured = await I18n_RestClient.captureI18n();
      if (i18nCaptured == null || uiParamsCaptured === null) {
        this.setState({ i18nAndCfgReadResult: false });
      } else {
        try {
          //update i18n data
          i18n.setLocaleToUse(i18nCaptured.val[0].val);
          i18n.setLocalesInUse(i18nCaptured.val[1]);

          //update configuration data
          uiParams.setUiParams(uiParamsCaptured);

          this.setState({ i18nAndCfgReadResult: true });

          //emit event indicating: I18N_CHANGED
          let event = AppEvents.DEFINITION.I18N_CHANGED;
          let payload = AppEvents.getPayLoadObject(event);
          eventBus.emit(event, payload);
        } catch (error) {
          this.setState({ i18nAndCfgReadResult: false });
        }
      }
    }
  }

  async componentDidMount() {
    await this.captureConfiguration();
  }

  render() {
    const { indUserIsLoggedIn } = this.state;

    //Modal Dialog Handling
    let { i18nAndCfgReadResult } = this.state;
    let i18nReadCylceDone =
      i18nAndCfgReadResult === true || i18nAndCfgReadResult === false;

    //is i18n retrieval circle still running ?
    if (!i18nReadCylceDone) {
      return <WaitingForConfiguration />;
    } else {
      //did i18n retrieval circle deliver a problem
      if (i18nAndCfgReadResult === false) {
        let errorJson = AppConstants.CONSTANTS.ERROR_FETCH_FAIL;
        let errorInfo = JSON.parse(errorJson);
        errorInfo.errorText = 'I18n could not be retrieved';
        return (
          <div>
            <ErrorDisplay errorInfo={errorInfo} />
          </div>
        );
      }
    }

    //Modal Dialog Handling
    let refIsModalLoggedInUserOpen = this.setIsModalLoggedInUserOpen.bind(this);
    let refIsModalHelpOpen = this.setIsModalHelpOpen.bind(this);
    let refIsModalInfoOpen = this.setIsModalInfoOpen.bind(this);
    let refSwithLocale = this.switchLocale.bind(this);
    let refDoLogOutAndResetData = this.doLogOutAndResetData.bind(this);

    let { isModalLoggedInUserOpen, isModalHelpOpen, isModalInfoOpen } =
      this.state;
    let availableLocales = i18n.getAvailableLocales();

    return (
      <>
        <Header aria-label="IBM Platform Name">
          <Link href="/" passHref legacyBehavior>
            <HeaderName href="/" prefix="">
              {i18n.t('app.title')}
            </HeaderName>
          </Link>
          <HeaderGlobalBar>
            <HeaderNavigation aria-label="IBM Platform Name">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* Bring up current selected language as first one*/}
              <HeaderMenu
                aria-label="Manage"
                menuLinkName={i18n.getLocaleInUse().toUpperCase()}
              >
                {availableLocales.map(function (localeEntry, index) {
                  return (
                    <HeaderMenuItem
                      key = {index}
                      onClick={() => {
                        refSwithLocale(localeEntry);
                      }}
                    >
                      {localeEntry.toUpperCase()}
                    </HeaderMenuItem>
                  );
                })}
              </HeaderMenu>
            </HeaderNavigation>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {indUserIsLoggedIn ? (
              <>
                <HeaderGlobalAction
                  aria-label={i18n.t(
                    'ApplicationHeader.HeaderGlobalAction.help.Tooltip'
                  )}
                  tooltipAlignment="center"
                  className="action-icons"
                  onClick={() => refIsModalHelpOpen(true)}
                >
                  <Help size={20} />
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label={i18n.t(
                    'ApplicationHeader.HeaderGlobalAction.info.Tooltip'
                  )}
                  tooltipAlignment="center"
                  className="action-icons"
                  onClick={() => refIsModalInfoOpen(true)}
                >
                  <Information size={20} />
                </HeaderGlobalAction>

                <HeaderGlobalAction
                  aria-label={i18n.t(
                    'ApplicationHeader.HeaderGlobalAction.user.Tooltip'
                  )}
                  tooltipAlignment="center"
                  className="action-icons"
                  onClick={() => refIsModalLoggedInUserOpen(true)}
                >
                  <User size={20} />
                </HeaderGlobalAction>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </>
            ) : (
              <></>
            )}
          </HeaderGlobalBar>
        </Header>
        <ModalLoggedInUser
          open={isModalLoggedInUserOpen}
          setOpen={refIsModalLoggedInUserOpen}
          doLogOutAndResetData={refDoLogOutAndResetData}
        />
        <ModalInfo open={isModalInfoOpen} setOpen={refIsModalInfoOpen} />
        <ModalHelp open={isModalHelpOpen} setOpen={refIsModalHelpOpen} />
      </>
    );
  }
}

export default ApplicationHeaderContent;
