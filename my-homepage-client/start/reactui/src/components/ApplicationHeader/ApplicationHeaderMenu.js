'use client';

import React, { Component } from 'react';

import {
  HeaderMenu,
  HeaderMenuItem,
  Link,
} from '@carbon/react';
import { Home } from '@carbon/icons-react';

import * as AppConstants from './../../modules/Common/AppConstants'
import * as AppFunctions from './../../modules/Common/AppFunctions'


import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

import i18n from '@/singletons/i18n/I18n';


class ApplicationHeaderMenu extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
    };
  }


  changeVisiblePageToAppDetails() {
    let page = AppConstants.CONSTANTS.LANDING_PAGE_SHOW_APP_DETAILS;
    this.emitPageToDisplay(page);
  };
  changeVisiblePageToSessionData() {
    let page = AppConstants.CONSTANTS.LANDING_PAGE_ADMIN_SHOW_SESSION_DATA;
    this.emitPageToDisplay(page);
  };
  changeVisiblePageToDEFAULT() {
    let page = AppConstants.CONSTANTS.LANDING_PAGE_DEFAULT;
    this.emitPageToDisplay(page);
  };

  emitPageToDisplay(page) {
    let event = AppEvents.DEFINITION.LANDING_PAGE_CHANGED;
    let payload = AppEvents.getPayLoadObject(event);
    payload.page = page;
    eventBus.emit(event, payload);
  };


  render() {

    let indUserHasAdminRole = AppFunctions.hasUserRole(AppConstants.CONSTANTS.USER_ROLE_ADMIN);
    let indUserisStandardUser = AppFunctions.hasUserRole(AppConstants.CONSTANTS.USER_ROLE_STANDARD_USER);

    //i18n Labels for Menus
    let labelAdminMenuHead = i18n.t("ApplicationHeader.Menu.Admin.Head.text");
    let labelStandardUserHead = i18n.t("ApplicationHeader.Menu.StandardUser.Head.text");
    let labelMenuItem_AppDetails = i18n.t("ApplicationHeader.MenuItem.AppDetails.text");
    let labelMenuItem_SessionData = i18n.t("ApplicationHeader.MenuItem.SessionData.text");

    if (indUserHasAdminRole) {
      return (
        <>
          <HeaderMenu aria-label={labelAdminMenuHead} menuLinkName={labelAdminMenuHead}>
            <HeaderMenuItem onClick={this.changeVisiblePageToAppDetails.bind(this)}>{labelMenuItem_AppDetails}</HeaderMenuItem>
            <HeaderMenuItem onClick={this.changeVisiblePageToSessionData.bind(this)}>{labelMenuItem_SessionData}</HeaderMenuItem>
            <span style={{ padding: '0 8px', color: '#888' }}><hr /></span>
            <HeaderMenuItem onClick={this.changeVisiblePageToDEFAULT.bind(this)} ><Home style={{ marginRight: '8px' }} /></HeaderMenuItem>
          </HeaderMenu>
        </>
      ); //end of return

    }

    if (indUserisStandardUser) {
      return (
        <>
          <HeaderMenu aria-label={labelStandardUserHead} menuLinkName={labelStandardUserHead}>
          <HeaderMenuItem onClick={this.changeVisiblePageToAppDetails.bind(this)} >{labelMenuItem_AppDetails}</HeaderMenuItem>
            <span style={{ padding: '0 8px', color: '#888' }}><hr /></span>
            <HeaderMenuItem onClick={this.changeVisiblePageToDEFAULT.bind(this)} ><Home style={{ marginRight: '8px' }} /></HeaderMenuItem>
          </HeaderMenu>
        </>
      ); //end of return

    }

    //NO Menu :
    return (
      <>
      </>
    ); //end of return



  }
}

export default ApplicationHeaderMenu;
