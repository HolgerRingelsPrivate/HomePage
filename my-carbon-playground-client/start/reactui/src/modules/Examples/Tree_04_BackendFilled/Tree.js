'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TreeView, TreeNode, InlineLoading } from '@carbon/react';

import * as TreeBackendFilledRestClient from './backend/TreeBackendFilledRestClient';
import * as NodeContentProvider from './uihelper/ExampleTreeBackendFilled_NodeContentProvider';
import * as NodeIconProvider from './uihelper/ExampleTreeBackendFilled_NodeIconProvider';

class Tree extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      treeData: null,
    };
  }

  /**
   * The componentDidMount() -method retrieves the treeData from the
   * REST-Server and stores it to this component's state
   */
  async componentDidMount() {
    let dataFromRestService = await TreeBackendFilledRestClient.captureTree(null);
    this.setState({
      treeData: dataFromRestService
    });
  }


  /**
    * This method rendes the nodes recursively to User Interface
    * @param {*} nodes List of Nodes
    * @param {*} hrefRenderTreeNodes Pass-Through of render-method
    * @returns a rendered Tree Node with all it's children
    */
  renderTreeNodes = (nodes, hrefRenderTreeNodes) =>
    nodes.map((node) => (
      <TreeNode
        key={node.id}
        label={NodeContentProvider.getLeafDisplay(node)}
        isExpanded={false}
        renderIcon={NodeIconProvider.getIcon(node)}
      >
        {node.children && node.children.length > 0
          ? hrefRenderTreeNodes(node.children, hrefRenderTreeNodes)
          : null}
      </TreeNode>
    ));


  render() {

    let hrefRenderTreeNodes = this.renderTreeNodes.bind(this)

    const { treeData } = this.state;

    return (
      <div>
        {treeData === null
          ? 
          <InlineLoading
            description="..."
            iconDescription="..." />
          :
          <TreeView
            label="IBM Carbon TreeView"
          >
            {hrefRenderTreeNodes(treeData, hrefRenderTreeNodes)}
          </TreeView>
        }
      </div>
    );
  }
}

export default Tree;
