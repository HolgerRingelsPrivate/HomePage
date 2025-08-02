'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class Pattern extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>Hello World</div>
    );
  }
}

export default Pattern;
