'use client';

import React, { Component } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Accordion,
  AccordionItem,
} from '@carbon/react';
import { v4 as uuidv4 } from 'uuid';

import appSession from '@/singletons/session/AppSession';

import eventBus from '@/singletons/appEvents/EventBus';
import * as AppEvents from '@/singletons/appEvents/AppEvents';

import i18n from '@/singletons/i18n/I18n';
import uiParams from '@/singletons/uiParams/UIParams';

import SessionDataDisplayEventList from './SessionDataDisplayEventList';

class SessionDataDisplay extends Component {
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
    let sessionData = appSession.getSessionOverview();
    let oUiParams = uiParams.getUiParams();
    let params = uiParams.getUiParams().val; //= map (key,val)
    return (
      <>
        <h4>{i18n.t('ApplicationHeader.MenuItem.SessionData.text')}</h4>
        &nbsp;
        <br />
        <Accordion align="start">
          <AccordionItem
            title={i18n.t('Page.SessionDataDisplay.Accordion1.text')}
            open={false}
          >
            <div>
              <br />
              <br />
              <Table aria-label="sample">
                <TableHead>
                  <TableRow>
                    <TableCell>key</TableCell>
                    <TableCell>val</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>LOGGED_IN_USER</TableCell>
                    <TableCell>{sessionData.LOGGED_IN_USER}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>LOGGED_IN_USER_ROLES</TableCell>
                    <TableCell>{sessionData.LOGGED_IN_USER_ROLES}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>JSON_WEB_TOKEN</TableCell>
                    <TableCell>{sessionData.JSON_WEB_TOKEN}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              &nbsp;
            </div>
          </AccordionItem>

          <AccordionItem
            title={i18n.t('Page.SessionDataDisplay.Accordion2.text')}
            open={false}
          >
            &nbsp;
            <br />
            <Table aria-label="sample">
              <TableHead>
                <TableRow>
                  <TableCell>key</TableCell>
                  <TableCell>val</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {params.map((param) => (
                  <TableRow>
                    <TableCell>{param.key}</TableCell>
                    <TableCell>{param.val}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            &nbsp;
          </AccordionItem>

          <AccordionItem
            title={i18n.t('Page.SessionDataDisplay.Accordion3.text')}
            open={false}
          >
            &nbsp;
            <br />
            <div>
              <Table aria-label="sample">
                <TableHead>
                  <TableRow>
                    <TableCell>Event</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      <SessionDataDisplayEventList
                        eventName={AppEvents.DEFINITION.I18N_CHANGED}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SessionDataDisplayEventList
                        eventName={AppEvents.DEFINITION.LANDING_PAGE_CHANGED}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SessionDataDisplayEventList
                        eventName={AppEvents.DEFINITION.USER_LOOGED_IN}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <SessionDataDisplayEventList
                        eventName={AppEvents.DEFINITION.USER_LOOGED_OUT}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </AccordionItem>
        </Accordion>
      </>
    );
  }
}

export default SessionDataDisplay;
