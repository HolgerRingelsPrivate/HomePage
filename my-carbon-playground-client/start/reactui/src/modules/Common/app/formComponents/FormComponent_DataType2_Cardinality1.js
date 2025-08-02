'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextInput, Dropdown } from "@carbon/react";


class FormComponent_DataType2_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  //field change handler for: 'mediatype' 
  functionHandleDropDownChange (event) {
    const { field, onChangeFunction } = this.props;
    let code = event.selectedItem.code;
    onChangeFunction(field, code);
  }


  render() {

    const { defaultValue, mode, codetable, id } = this.props;
    
      //drop down variables
      let dropdown_items = codetable.getUiItems();
      let dropdown_item = codetable.getItemForCode(defaultValue);
      let dropdown_default_text = codetable.getTextForCode(defaultValue);

      return (
        <>
            {mode === 'R'
            ? <TextInput size = 'lg' readOnly   value={dropdown_default_text}/>
            : <Dropdown
                id = {id} 
                selectedItem={dropdown_item}
                titleText=""
                label="..."
                items={dropdown_items}
                itemToString={(item) => (item ? item.text : '')}
                onChange={this.functionHandleDropDownChange.bind(this)} 
              />  
            }
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

export default FormComponent_DataType2_Cardinality1;
