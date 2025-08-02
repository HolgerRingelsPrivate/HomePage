'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput } from "@carbon/react";


class FormComponent_DataType3_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  functionHandleBooleanChange (fieldName) {

    const { defaultValue, field, onChangeFunction } = this.props;

    let indCurrentValue = defaultValue;
    let indNewValue= true;
    if (indCurrentValue === true ) {
      indNewValue= false;
    }

    onChangeFunction(field, Number(indNewValue));

  }

  render() {
    const { defaultValue, mode, id } = this.props;

    return (
      <>
        <br/>&nbsp;<br/>
        <div>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="checkbox"
              disabled={mode === 'R'}
              id = {id} 
              checked= {defaultValue}
              onChange = {this.functionHandleBooleanChange.bind(this, "selected")}
              
            />
            &nbsp; 
          </label>
        </div>
        <br/>                 
      </>
    );

  }

}

export default FormComponent_DataType3_Cardinality1;
