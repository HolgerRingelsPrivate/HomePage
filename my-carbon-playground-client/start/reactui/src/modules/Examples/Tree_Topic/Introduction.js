'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class Introduction extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    return (
      <div>
        &nbsp;<br/>
        <h5>Introducton to Topic: Tree</h5>
      </div>
    );
  }
}

export default Introduction;
