'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import i18n from './../../../singletons/i18n/I18n';

class EntityDisplayNotSelected extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      // pageToDisplay: 0,
    };
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <p>&nbsp;&nbsp;{i18n.t('EntityDisplayNotSelected.text')}</p>
      </div>
    );
  }
}

export default EntityDisplayNotSelected;
