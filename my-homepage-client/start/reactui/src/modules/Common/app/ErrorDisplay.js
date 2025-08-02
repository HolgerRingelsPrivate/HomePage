'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class ErrorDisplay extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    const { errorInfo } = this.props;

    return (
      <div className="thisApp_ERROR_Display">
        <h3>An Error Occured</h3>
        <p>
          ErrorCode {errorInfo.errorCode} : {errorInfo.errorText}
        </p>
      </div>
    );
  }
}

export default ErrorDisplay;
