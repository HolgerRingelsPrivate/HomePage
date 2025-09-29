'use client';

import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import { TreeView, TreeNode } from '@carbon/react';
import { Folder, Demo, Document } from '@carbon/icons-react';
import i18n from '@/singletons/i18n/I18n';

import * as CT_carbonplay_TopicsAndExamples from './../../Common/codetable/carbonplay/CT_carbonplay_TopicsAndExamples';

class EntityNavigation extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }


  toggleUi(selected) {
    this.props.functionDisplayEntity(selected);
  }


  render() {


    return (
      <div>
        <TreeView
          label=""
          onSelect={() => { }}
        >
          <TreeNode
            id="1"
            label={i18n.t('EntityDisplay.Example.text')}
            value=""
            isExpanded={true}
            renderIcon={Folder}
          >

            <TreeNode
              id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE}
              label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE)}
              value=""
              isExpanded={true}
              renderIcon={Document}
              onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE)}
            >


              <TreeNode
                id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED}
                label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
              >
              </TreeNode>


              <TreeNode
                id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY}
                label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY)}
              >
              </TreeNode>

              <TreeNode
                id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2}
                label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
              >
              </TreeNode>

              <TreeNode
                id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1}
                label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
              >
              </TreeNode>

              <TreeNode
                id={CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FEATURED_UI}
                label={CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FEATURED_UI)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FEATURED_UI)}
              >
              </TreeNode>

            </TreeNode>


          </TreeNode>

        </TreeView>
      </div>
    );
  }
}

export default EntityNavigation;
