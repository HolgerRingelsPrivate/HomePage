'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class ListCellComponent_DataType19_Cardinality1 extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    const {listKeyVal, listKey} = this.props;
    let display = listKey;

    try {
      for (let i = 0; i < listKeyVal.list.length; i++) {
        let entryKeyVal = listKeyVal.list[i];
        if (entryKeyVal.key === listKey) {
          display = entryKeyVal.val;
        }
      }
    } catch (error) {
      //do nothing ... just display the key instead of the value
    }

    return (
      <>{display}</>
    );
  }
}

export default ListCellComponent_DataType19_Cardinality1;
