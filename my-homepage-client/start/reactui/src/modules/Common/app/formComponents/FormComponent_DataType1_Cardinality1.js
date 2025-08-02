'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput } from "@carbon/react";


class FormComponent_DataType1_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  functionHandleTextFieldChange(event) {
    let fieldName = event.target.id.split("_")[3];
    let newValue  = event.target.value;

    const { field, onChangeFunction } = this.props;

    onChangeFunction(field, newValue);
  }


  render() {
    const { defaultValue, mode, id } = this.props;

    return (
      <>
          {mode === 'R'
          ? <TextInput size = 'lg' readOnly   value={defaultValue}/>
          : <TextInput size = 'lg'            value={defaultValue} 
                id = {id} 
                onChange={this.functionHandleTextFieldChange.bind(this)}/> 
          }
      </>
    );

  }

}

export default FormComponent_DataType1_Cardinality1;
