'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as CT_ADD_Examples from './../Common/codetable/carbonplay/CT_ADD_Examples';

import ExampleButtons from './Buttons/ExampleButtons';
import ExampleTreeSelfFilled from './TreeSelfFilled/ExampleTreeSelfFilled';
import ExampleTreeBackendFilled from './TreeBackendFilled/ExampleTreeBackendFilled';
import ExampleTreeBackendFilledViaList from './TreeBackendFilledViaList/ExampleTreeBackendFilledViaList';

class Pattern extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }



  render() {

    let { entityToDisplay } = this.props;

    switch (entityToDisplay) {
      case CT_ADD_Examples.CODE.JS_EXAMPLE_BUTTONS:
        return (
          <ExampleButtons />
        );
        break;

      case CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_SELF_FILLED:
        return (
          <ExampleTreeSelfFilled />
        );
        break;

      case CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1:
        return (
          <ExampleTreeBackendFilled />
        );
        break;
      case CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2:
        return (
          <ExampleTreeBackendFilledViaList />
        );
        break;


      default:
        return (
          <div>?</div>
        );
    }


  }
}

export default Pattern;
