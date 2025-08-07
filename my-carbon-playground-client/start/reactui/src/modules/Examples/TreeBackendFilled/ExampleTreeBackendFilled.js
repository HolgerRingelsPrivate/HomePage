'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TreeView, TreeNode } from '@carbon/react';
import { Folder, Demo } from '@carbon/icons-react';
import i18n from './../../../singletons/i18n/I18n';

class ExampleTreeBackendFilled extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>ExampleTreeBackendFilled</div>
    );
  }
}

export default ExampleTreeBackendFilled;
