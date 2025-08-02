'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class ListCellComponent_DataType20_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  /**
   * This method creats a default list cell object based on the defaultValue (String),
   * which has been handled over by List via props.
   * It defines the values of the object if defaultValue is an empty string or non-valid json
   * @returns filled default object
   */
  getListObject() {
    const { listVal } = this.props;
    try {
      const object = JSON.parse(listVal);
      let numberFrom = object.numberFrom.toString();
      let numberTo = object.numberTo.toString();
      return object;

    } catch (error) {

      const object = new Object();
      object.numberFrom = '0';
      object.numberTo = '0';
      return object

    }

  }


  render() {
    let object = this.getListObject();
    let display = '' + object.numberFrom + ' - ' + object.numberTo;

    return (
      <>{display}</>
    );
  }
}

export default ListCellComponent_DataType20_Cardinality1;
