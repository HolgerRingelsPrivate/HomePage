'use client';

import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import { TreeView, TreeNode } from '@carbon/react';
import { Folder, Demo } from '@carbon/icons-react';
import i18n from '@/singletons/i18n/I18n';

import * as CT_ADD_Examples from './../../Common/codetable/carbonplay/CT_ADD_Examples';

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

  // functionChangeEntityToDislay(entityToDisplay) {
  //   this.props.functionDisplayEntity(entityToDisplay);
  // }

  render() {

    // let fRef1 = this.functionChangeEntityToDislay.bind(this);


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

            {/* <TreeNode
              id={CT_ADD_Examples.CODE.JS_EXAMPLE_BUTTONS}
              label={CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_BUTTONS)}
              value=""
              isExpanded={true}
              renderIcon={Demo}
              onSelect={this.toggleUi.bind(this, CT_ADD_Examples.CODE.JS_EXAMPLE_BUTTONS)}
            >
            </TreeNode> */}

            <TreeNode
              id={CT_ADD_Examples.CODE.JS_EXAMPLE_TREE}
              label={CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE)}
              value=""
              isExpanded={true}
              renderIcon={Demo}
              onSelect={this.toggleUi.bind(this, CT_ADD_Examples.CODE.JS_EXAMPLE_TREE)}
            >


              <TreeNode
                id={CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_SELF_FILLED}
                label={CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
              >
              </TreeNode>

              <TreeNode
                id={CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1}
                label={CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
              >
              </TreeNode>

              <TreeNode
                id={CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2}
                label={CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
                value=""
                isExpanded={true}
                renderIcon={Demo}
                onSelect={this.toggleUi.bind(this, CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
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
