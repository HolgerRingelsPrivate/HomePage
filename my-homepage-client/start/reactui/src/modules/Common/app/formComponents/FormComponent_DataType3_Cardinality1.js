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

  functionHandleNumberFieldChange(event) {
    let fieldName = event.target.id.split("_")[3];
    let newValue  = event.target.value;

    if (newValue !== '') { //empty is allowed

      //... and it MUST be only numbers
      var regExp = new RegExp("^\\d+$");
      var indValid = regExp.test(newValue);
      if (indValid === false)  {
        return;
      }
    }

    const { field, onChangeFunction } = this.props;

    onChangeFunction(field, Number(newValue));
  }

  render() {
    const { defaultValue, mode, id } = this.props;

    return (
      <>
        {mode === 'R'
        ? <TextInput size = 'lg' readOnly   value={defaultValue}/>
        : <TextInput size = 'lg'            value={defaultValue} 
                      id = {id} 
                      onChange={this.functionHandleNumberFieldChange.bind(this)}/> 
        }
      </>
    );

  }

}

export default FormComponent_DataType3_Cardinality1;
