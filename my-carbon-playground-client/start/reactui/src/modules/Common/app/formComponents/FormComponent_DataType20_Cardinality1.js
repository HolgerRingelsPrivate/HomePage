'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput } from "@carbon/react";


class FormComponent_DataType20_Cardinality1 extends Component {
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

    let num = Number(newValue); 
    newValue = num.toString();
    
    const { field, onChangeFunction } = this.props;

    
    let object = this.getFormObject();
    object[fieldName] = newValue;
    let sObjectAsJSON = JSON.stringify(object);
    onChangeFunction(field, sObjectAsJSON);
  }



  render() {

    const { entity, field, mode, defaultValue, onChangeFunction, id } = this.props;
    let formObject = this.getFormObject();

      return (
        <>
          <table width="100%">
            <tr>
              <td width="45%">
                {mode === 'R' 
                  ? <TextInput readOnly   value={'' + formObject.numberFrom}/>
                  : <TextInput 
                      id = {id + "_numberFrom"} 
                      value={'' + formObject.numberFrom}
                      onChange={this.functionHandleNumberFieldChange.bind(this)}
                    />
                }
              </td>
              <td width="10%">
                <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              </td>
              <td width="45%">
                {mode === 'R' 
                  ? <TextInput readOnly   value={'' + formObject.numberTo}/>
                  : <TextInput 
                      id = {id + "_numberTo"} 
                      value={'' + formObject.numberTo}
                      onChange={this.functionHandleNumberFieldChange.bind(this)}
                    />
                }
              </td>
            </tr>
          </table>
          <br/>
        </>
      );

    }
  
  


  /**
   * This method creats a default object based on the defaultValue (String),
   * which has been handled over by Form via props.
   * It defines the values of the object if defaultValue is an empty string or non-valid json
   * @returns filled default object
   */
  getFormObject() {
    const { defaultValue } = this.props;
    try {
      const object = JSON.parse(defaultValue);
      let numberFrom = object.numberFrom;
      let numberTo = object.numberTo;
      return object;

    } catch (error) {

      const object = new Object();
      object.numberFrom = 0;
      object.numberTo = 0;
      return object

    }

  }

}

export default FormComponent_DataType20_Cardinality1;
