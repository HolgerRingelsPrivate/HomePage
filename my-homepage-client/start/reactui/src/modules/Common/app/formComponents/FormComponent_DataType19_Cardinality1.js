'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as DataType19_Provider_RestClient from './../../backend/DataType19_Provider_RestClient';
import ErrorDisplay from './../ErrorDisplay'
import { TextInput, Dropdown } from "@carbon/react";


class FormComponent_DataType19_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      dataFromRestClient : null,
    };
  }

  async componentDidMount() {
    const { mode, defaultValue } = this.props;
    const { entity, field } = this.props;
    let objResult = await DataType19_Provider_RestClient.captureKeyValList(entity, field); //contains .list and .errorInfo (only one filled)
    this.setState({
      dataFromRestClient: objResult,
    })

  }


  functionOnChange(event) {
    const { field,onChangeFunction } = this.props;
    let code = event.selectedItem.code;
    if (code === '') {
      code = null;
    }
    onChangeFunction(field, code)
  }

  render() {

    const { entity, field, mode, defaultValue, onChangeFunction } = this.props;
    const { dataFromRestClient } = this.state;

    if (dataFromRestClient === null) {
      return (
        <div></div>
      );
    }

    let errorInfo = dataFromRestClient.errorInfo;

    if (errorInfo !== null) {
      return (
        <ErrorDisplay
          errorInfo={errorInfo}
        />
      );
    }

    let dropdown_items = this.deriveDropDownItemsFromServerData();
    let dropdown_item = this.deriveDropDownItem(dropdown_items);

    if (mode === 'R') {
      let text_input_text = this.text_for_text_input_text();
      return (
        <div>
          <TextInput size = 'lg' readOnly   value={text_input_text}/>
        </div>
      );
    }


    return (
      <div>
          <Dropdown 
            id = {"ET_" + entity + "_Object_" + field}
            selectedItem={dropdown_item}
            titleText=""
            label="..."
            items={dropdown_items}
            itemToString={(item) => (item ? item.text : '')}
            onChange = {this.functionOnChange.bind(this)}
          />
      </div>
    );

  }


  deriveDropDownItemsFromServerData() {

    const { dataFromRestClient } = this.state;
    let serverList = dataFromRestClient.list;

    let dropdown_items = [
      {
        code: '',
        text: '...'
      }
    ];

    for (let i = 0; i < serverList.length; i++) {
      let entry = serverList[i];
      let entryObject = {};
      entryObject.code = entry.key;
      entryObject.text = entry.val;
      dropdown_items.push(entryObject);
    }

    return dropdown_items;
  } 

  deriveDropDownItem(dropdown_items) {
    const { dataFromRestClient } = this.state;
    const { defaultValue } = this.props;
    let serverList = dataFromRestClient.list;
    for (let i = 0; i < serverList.length; i++) {
      let entry = serverList[i];
      if (entry.key === defaultValue) {
        let entryObject = {};
        entryObject.code = entry.key;
        entryObject.text = entry.val;
        return entryObject;
      }
    }
    let result = dropdown_items[0]; 
    return result;
  }
  /**
   * This method delivers the default value, which is visible in 
   * <TextInput /> (Read Modus)
   * @returns 
   */
  text_for_text_input_text() {
    const { defaultValue } = this.props;
    if (defaultValue === null) {
      return "";  
    }
    if (defaultValue === undefined) {
      return "";  
    }
    const { dataFromRestClient } = this.state;
    if (dataFromRestClient === null) {
      return "";  
    }

    try {
      let serverList = dataFromRestClient.list;
      for (let i = 0; i < serverList.length; i++) {
        let entry = serverList[i];
        if (entry.key === defaultValue) {
          return entry.val;
        }
      }  

    } catch (error) {
      return "";  
    }
    return ""; 
  }

}

export default FormComponent_DataType19_Cardinality1;
