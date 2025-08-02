'use client';
// components/Counter.js

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';
import i18n from '@/singletons/i18n/I18n';
import uiParams from '@/singletons/uiParams/UIParams';
import { InlineLoading } from '@carbon/react';
import WaitingForConfiguration from './../../modules/Common/app/WaitingForConfiguration';

class Counter extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      eventBusTimeStamp: null,
      count: 0,
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

  //This causes a re-render on incoming event
  handleI18NUpdateEvent(payload) {
    let newEventTimeStamp = new Date().getTime();
    this.setState({ eventBusTimeStamp: newEventTimeStamp });
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    let key = 'Patterns.Counter.label1';
    let val = i18n.t('Patterns.Counter.label1');
    if (key === val) {
      return <WaitingForConfiguration />;
    }

    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>&nbsp;</p>
        <h1>{i18n.t('app.subtitle')}</h1>
        <p>&nbsp;</p>
        <hr />
        <p>&nbsp;</p>
        <h2>
          {i18n.t('Patterns.Counter.label1')}: {this.state.count}
        </h2>
        <button onClick={this.increment} style={{ marginRight: '10px' }}>
          {i18n.t('Patterns.Counter.btn.increment')}
        </button>
        <button onClick={this.decrement}>
          {i18n.t('Patterns.Counter.btn.decrement')}
        </button>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Counter;
