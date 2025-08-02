'use client';
// components/Counter.js

import React, { Component } from 'react';
import { Theme } from '@carbon/react';
import { v4 as uuidv4 } from 'uuid';

import * as AppConstants from './../../modules/Common/AppConstants';

import appSession from '@/singletons/session/AppSession';
import * as AppSessionData from '@/singletons/session/AppSessionData';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

import uiParams from '@/singletons/uiParams/UIParams';

import LogInForm from '@/modules/Common/app/LogInForm';
import VersionsAndSettingsDisplayContent from '@/modules/Common/app/VersionsAndSettingsDisplayContent';
import Counter from '@/components/patterns/Counter';
import SessionDataDisplay from '@/modules/Common/app/SessionDataDisplay';
import EmptyLines from '@/modules/Common/app/EmptyLines';
import WaitingForConfiguration from '@/modules/Common/app/WaitingForConfiguration';
import EntityRoot from './../../modules/Common/app/EntityRoot';

class LandingPageContent extends Component {
  constructor(props) {
    super(props);
    let loggedInUser = appSession.getObject(
      AppSessionData.OBJECT_DEF.LOGGED_IN_USER
    );
    let defaultShowContentUi = false;
    let defaultShowLogInUi = true;
    if (loggedInUser !== undefined) {
      defaultShowContentUi = true;
      defaultShowLogInUi = false;
    }

    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      showContentUi: defaultShowContentUi,
      showLogInUi: defaultShowLogInUi,
      otherPageToDisplay: AppConstants.CONSTANTS.LANDING_PAGE_DEFAULT,
      loginForm: {
        user: null,
        password: null,
        loginFailed: false,
      },
      uiParamsAvaiable: false,
    };

    //subscribe on eventBus
    eventBus.subscribe(
      AppEvents.DEFINITION.LANDING_PAGE_CHANGED,
      this.state.id,
      this.handleEventLandingPageChanged.bind(this)
    );
    eventBus.subscribe(
      AppEvents.DEFINITION.I18N_CHANGED,
      this.state.id,
      this.configurationCaptured.bind(this)
    );
  }

  componentWillUnmount() {
    //Clean up:
    // - UNSUBCRIBE from eventBus
    eventBus.unsubscribe(
      AppEvents.DEFINITION.LANDING_PAGE_CHANGED,
      this.state.id
    );
    eventBus.unsubscribe(AppEvents.DEFINITION.I18N_CHANGED, this.state.id);
    // - Clearing timers
  }

  handleEventLandingPageChanged(payload) {
    this.setState({
      showContentUi: false,
      showLogInUi: false,
      otherPageToDisplay: payload.page,
    });
  }

  configurationCaptured() {
    this.setState({ uiParamsAvaiable: true });
  }

  /**
   * This method reacts on changes from LoginForm Fields
   * @param {*} event
   */
  handleLogInFormChange(event) {
    let fieldName = event.target.id;
    let fieldVal = event.target.value;
    this.setState({
      loginForm: { ...this.state.loginForm, [fieldName]: fieldVal },
    });
  }

  /**
   * This method reacts on Login attempt raise by LoginForm
   * @param {*} event
   */
  async handleLogInEnter(event) {
    let { loginForm } = this.state;
    let user = loginForm.user;
    let success = false;
    if (user !== null && user !== undefined && user !== '') {
      success = true;
    }
    if (success === true) {
      //-----------------------------------------------------------------
      //This is variable due to architecture ... here is a simple example
      //-----------------------------------------------------------------
      //store user in appSession
      {
        let sessionClass = AppSessionData.OBJECT_DEF.LOGGED_IN_USER;
        let userSessionObject = AppSessionData.getDefaultObject(sessionClass);
        userSessionObject.user = user;
        appSession.setData(sessionClass, userSessionObject);
      }
      //store user-roles in appSession
      {
        let sessionClass = AppSessionData.OBJECT_DEF.LOGGED_IN_USER_ROLES;
        let userSessionObject = AppSessionData.getDefaultObject(sessionClass);
        let aryOfRoles = userSessionObject.userroles;
        if (user === 'admin') {
          aryOfRoles.push(AppConstants.CONSTANTS.USER_ROLE_ADMIN);
          aryOfRoles.push(AppConstants.CONSTANTS.USER_ROLE_STANDARD_USER);
        } else {
          aryOfRoles.push(AppConstants.CONSTANTS.USER_ROLE_STANDARD_USER);
        }
        appSession.setData(sessionClass, userSessionObject);
      }

      //update state
      this.setState({
        loginForm: { ...this.state.loginForm, user: null, password: null },
      });
      this.setState({
        showContentUi: true,
        showLogInUi: false,
        otherPageToDisplay: AppConstants.CONSTANTS.LANDING_PAGE_DEFAULT,
      });

      //inform application header about login via event
      let event = AppEvents.DEFINITION.USER_LOOGED_IN;
      let payload = AppEvents.getPayLoadObject(event);
      payload.user = user;
      eventBus.emit(event, payload);
    } else {
      this.setState({
        loginForm: { ...this.state.loginForm, loginFailed: true },
      });
    }
  }

  render() {
    let theme = 'white'; //'g100' for black background  'white' for white background

    const { showLogInUi, loginForm, otherPageToDisplay, uiParamsAvaiable } =
      this.state;

    if (uiParamsAvaiable === false) {
      return <WaitingForConfiguration />;
    }

    if (showLogInUi) {
      return (
        <>
          <Theme theme={theme}>
            <LogInForm
              handleLogInFormChange={this.handleLogInFormChange.bind(this)}
              handleLogInEnter={this.handleLogInEnter.bind(this)}
              loginForm={loginForm}
            />
          </Theme>
        </>
      ); //end of retrun
    }

    if (otherPageToDisplay === AppConstants.CONSTANTS.LANDING_PAGE_DEFAULT) {
      return (
        <>
          <Theme theme={theme}>
            <EntityRoot />
            <EmptyLines />
          </Theme>
        </>
      ); //end of retrun
    }

    if (
      otherPageToDisplay ===
      AppConstants.CONSTANTS.LANDING_PAGE_SHOW_APP_DETAILS
    ) {
      return (
        <>
          <Theme theme={theme}>
            <div>
              <br />
              <br />
              <table width="100%">
                <tr>
                  <td width="10%"></td>
                  <td width="80%">
                    <VersionsAndSettingsDisplayContent />
                    <EmptyLines />
                  </td>
                  <td width="10%"></td>
                </tr>
              </table>
            </div>
          </Theme>
        </>
      ); //end of retrun
    }

    if (
      otherPageToDisplay ===
      AppConstants.CONSTANTS.LANDING_PAGE_ADMIN_SHOW_SESSION_DATA
    ) {
      return (
        <>
          <Theme theme={theme}>
            <div>
              <br />
              <br />
              <table width="100%">
                <tr>
                  <td width="10%"></td>
                  <td width="80%">
                    <SessionDataDisplay />
                    <EmptyLines />
                  </td>
                  <td width="10%"></td>
                </tr>
              </table>
            </div>
          </Theme>
        </>
      ); //end of retrun
    }

    return (
      <>
        <Theme theme={theme}>{otherPageToDisplay}</Theme>
      </>
    ); //end of retrun
  }
}

export default LandingPageContent;
