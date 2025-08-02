'use client';
import {
    InlineLoading,
  } from '@carbon/react';
import React, { Component } from 'react';

class WaitingForConfiguration extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
    };
  }


  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <InlineLoading description="" />
      </div>
    );
  }
}

export default WaitingForConfiguration;
