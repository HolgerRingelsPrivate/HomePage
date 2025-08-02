'use client';

import React, { Component } from 'react';
import {
  Button,
  Theme,
  Form,
  FormGroup,
  Stack,
  TextInput,
  PasswordInput,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { v4 as uuidv4 } from 'uuid';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

import i18n from '@/singletons/i18n/I18n';
import uiParams from '@/singletons/uiParams/UIParams';
import WaitingForConfiguration from './WaitingForConfiguration';

class LogInForm extends Component {
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

  /**
   * This method reacts on changes from Modal Dialog Fields
   * @param {*} event
   */
  async handleLogInFormChange(event) {
    await this.props.handleLogInFormChange(event);
  }

  async handleLogInEnter(event) {
    await this.props.handleLogInEnter(event);
  }

  handleKeyPress(e) {
    let pressedKey = e.code;
    if (pressedKey === 'Enter') {
      // Enter ??
      this.handleLogInEnter();
    }
  }

  render() {
    let key = 'app.title-short';
    let val = i18n.t('app.title-short');
    if (key === val) {
      return <WaitingForConfiguration />;
    }

    let indWarn = false;

    return (
      <div className="login-position background-img fullscreen">
        <Form>
          <FormGroup
            legendId="form-group-1"
            style={{
              maxWidth: '400px',
            }}
          >
            {indWarn ? (
              <Stack gap={7}>
                <TextInput
                  id="user"
                  labelText={i18n.t('LoginForm.TextInput.labelText')}
                  placeholder={i18n.t('LoginForm.TextInput.placeholder')}
                  onChange={this.handleLogInFormChange.bind(this)}
                  onKeyUpCapture={(e) => this.handleKeyPress(e)}
                  warn={true}
                />
                <PasswordInput
                  id="password"
                  labelText={i18n.t('LoginForm.PasswordInput.labelText')}
                  placeholder={i18n.t('LoginForm.PasswordInput.placeholder')}
                  onChange={this.handleLogInFormChange.bind(this)}
                  onKeyUpCapture={(e) => this.handleKeyPress(e)}
                  warn={true}
                  warnText={i18n.t('LoginForm.warn.warnText')}
                  showPasswordLabel={i18n.t(
                    'LoginForm.PasswordInput.showPasswordLabel'
                  )}
                  hidePasswordLabel={i18n.t(
                    'LoginForm.PasswordInput.hidePasswordLabel'
                  )}
                />

                <Button
                  className="full-width"
                  renderIcon={ArrowRight}
                  iconDescription="Add"
                  onClick={this.handleLogInEnter.bind(this)}
                >
                  {i18n.t('LoginForm.button.text')}
                </Button>
              </Stack>
            ) : (
              <Stack gap={7}>
                <TextInput
                  id="user"
                  labelText={i18n.t('LoginForm.TextInput.labelText')}
                  placeholder={i18n.t('LoginForm.TextInput.placeholder')}
                  onChange={this.handleLogInFormChange.bind(this)}
                  onKeyUpCapture={(e) => this.handleKeyPress(e)}
                />

                <PasswordInput
                  id="password"
                  labelText={i18n.t('LoginForm.PasswordInput.labelText')}
                  placeholder={i18n.t('LoginForm.PasswordInput.placeholder')}
                  onChange={this.handleLogInFormChange.bind(this)}
                  onKeyUpCapture={(e) => this.handleKeyPress(e)}
                  showPasswordLabel={i18n.t(
                    'LoginForm.PasswordInput.showPasswordLabel'
                  )}
                  hidePasswordLabel={i18n.t(
                    'LoginForm.PasswordInput.hidePasswordLabel'
                  )}
                />

                <Button
                  className="full-width"
                  renderIcon={ArrowRight}
                  iconDescription="Add"
                  onClick={this.handleLogInEnter.bind(this)}
                >
                  {i18n.t('LoginForm.button.text')}
                </Button>
              </Stack>
            )}
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default LogInForm;
