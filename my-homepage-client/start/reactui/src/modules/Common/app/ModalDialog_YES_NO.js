'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '@carbon/react';
import i18n from '@/singletons/i18n/I18n';

class ModalDialog_YES_NO extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  async closeDialog(indYES) {
    // YES = true or false
    const { functionClose } = this.props;
    functionClose(indYES);
  }

  render() {
    const { modalHeader, question } = this.props;
    let indMultiLineQuestion = Array.isArray(question);
    if (indMultiLineQuestion === false) {
      return (
        <div>
          <Modal
            modalHeading={modalHeader}
            open
            primaryButtonText={i18n.t('ModalDialog_YES_NO.buttonText.YES')}
            secondaryButtonText={i18n.t('ModalDialog_YES_NO.buttonText.NO')}
            onRequestSubmit={(e) => this.closeDialog(true)}
            onSecondarySubmit={(e) => this.closeDialog(false)}
          >
            <p>{question}</p>
          </Modal>
        </div>
      );
    } else {
      return (
        <div>
          <Modal
            modalHeading={modalHeader}
            open
            primaryButtonText={i18n.t('ModalDialog_YES_NO.buttonText.YES')}
            secondaryButtonText={i18n.t('ModalDialog_YES_NO.buttonText.NO')}
            onRequestSubmit={(e) => this.closeDialog(true)}
            onSecondarySubmit={(e) => this.closeDialog(false)}
          >
            {question.map(function (lineOfQuestion) {
              if (lineOfQuestion === '') {
                return <p>&nbsp;</p>;
              } else {
                return <p>{lineOfQuestion}</p>;
              }
            })}
          </Modal>
        </div>
      );
    }
  }
}

export default ModalDialog_YES_NO;
