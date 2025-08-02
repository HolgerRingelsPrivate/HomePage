'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import i18n from '@/singletons/i18n/I18n';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

class VersionsAndSettingsDisplayContent extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      eventBusTimeStamp: null,
    };
    eventBus.subscribe(
      AppEvents.DEFINITION.I18N_CHANGED,
      this.state.id,
      this.handleI18NUpdateEvent.bind(this)
    );
  }

  componentWillUnmount() {
    //Clean up:
    // - UNSUBCRIBE from eventBus
    eventBus.unsubscribe(AppEvents.DEFINITION.I18N_CHANGED, this.state.id);
    // - Clearing timers
  }

  /**
   * This method causes a re-render based on i18n change
   * @param {*} payload
   */
  handleI18NUpdateEvent(payload) {
    let newEventTimeStamp = new Date().getTime();
    this.setState({ eventBusTimeStamp: newEventTimeStamp });
  }

  render() {
    return (
      <div>
        <h3>{i18n.t('ApplicationHeader.MenuItem.AppDetails.text')}</h3>
        <br />
        <br />

        <table>
          <tr>
            <td colspan="4">
              <h5>app.release.appname</h5>
              <br />
              &nbsp;
            </td>
          </tr>
          <tr>
            <td colspan="4">
              <h5>app.build.id</h5>
              <br />
              &nbsp;
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default VersionsAndSettingsDisplayContent;
