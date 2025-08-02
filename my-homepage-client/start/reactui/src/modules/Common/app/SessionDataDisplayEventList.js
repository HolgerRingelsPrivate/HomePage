'use client';

import React, { Component } from 'react';

import eventBus from './../../../singletons/appEvents/EventBus';
import * as AppEvents from './../../../singletons/appEvents/AppEvents';

import i18n from './../../../singletons/i18n/I18n';

import {
  Accordion,
  AccordionItem,
} from '@carbon/react';

import { v4 as uuidv4 } from 'uuid';

class SessionDataDisplayEventList extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  //list.map((row) => (
  render() {

    let { eventName } = this.props;
    let eventBusSubscriptions = eventBus.getSubscriptions();
    let eventSubscriptions = eventBusSubscriptions[eventName];

    let entryArray = [];
    for (let subscription in eventSubscriptions) {
      let entry = {
        name: subscription,
      }
      entryArray.push(entry)
    }
    //sort list by name of tenant
    entryArray.sort((a, b) => (a.name > b.name) ? 1 : -1)


    return (
      <div style={{ textAlign: 'left', marginTop: '20px', marginBottom: '20px' }}>
        {eventName}
        <Accordion align="start">
          <AccordionItem
            title={i18n.t('Page.SessionDataDisplayEventList.Accordion.text')}
            open={false}
          >

            {entryArray.map((entry) => (
              <div>
                &nbsp;-&nbsp;&nbsp;{entry.name}
              </div>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export default SessionDataDisplayEventList;
