'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as CT_carbonplay_TopicsAndExamples from './../Common/codetable/carbonplay/CT_carbonplay_TopicsAndExamples';

import ExampleButtons from './Buttons/ExampleButtons';

import Tree_Introduction from './Tree_00_Topic/Introduction';
import Tree_01 from './Tree_01_SelfFilled/Tree';
import Tree_02 from './Tree_02_BackendFilledExplainDirectory/Tree';
import Tree_03 from './Tree_03_BackendFilledViaList/Tree';
import Tree_04 from './Tree_04_BackendFilled/Tree';

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
      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_BUTTONS:
        return (
          <ExampleButtons />
        );
        break;

      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE:
        return (
          <Tree_Introduction />
        );
        break;

      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED:
        return (
          <Tree_01 />
        );
        break;

      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1:
        return (
          <Tree_04 />
        );
        break;
      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2:
        return (
          <Tree_03 />
        );
        break;
      case CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY:
        return (
          <Tree_02 />
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
