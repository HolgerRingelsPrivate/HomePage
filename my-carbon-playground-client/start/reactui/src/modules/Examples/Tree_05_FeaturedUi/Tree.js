'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  TreeView,
  TreeNode,
  InlineLoading,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
  Tooltip,
  TextInput,
  FormLabel

} from '@carbon/react';
import { Reset, Checkbox, CheckboxChecked, CollapseCategories, ExpandCategories } from '@carbon/icons-react';

import * as BrowserStoreConnection from './backend/BrowserStoreConnection';
import * as UiActionHandler from './../../Common/core/TreeView/UiActionHandler';
import * as NodeUiProvider from './uihelper/NodeUiProvider';
import FormComponent_TypeAheadField from './uihelper/FormComponent_TypeAheadField';
import i18n from './../../../singletons/i18n/I18n';

import * as RESTClient from './backend/RestClient';
import * as NodeContentProvider from './../Tree_04_BackendFilled/uihelper/NodeContentProvider';
import * as NodeIconProvider from './../Tree_04_BackendFilled/uihelper/NodeIconProvider';

class Tree extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      timeStamp: null, //used to enforce re-render
      searchMatches: [],
      data: {
        typeAhead: "",
      }
    };
  }

  /**
 * This method enforces an update of this Component
 */
  async updateThis() {
    //enforce re-render
    this.setState({
      timeStamp: new Date(),
    });
  }

  /**
   * The componentDidMount() -method retrieves the treeData from the
   * REST-Server and stores it to this component's state
   */
  async componentDidMount() {
    let dataFromRestService = await RESTClient.captureTree(null);
    BrowserStoreConnection.setTree_05(dataFromRestService);
    await this.updateThis();
  }

  /**
   * This function is triggered, when a Node is expanded or collapsed in Ui
   * @param node 
   */
  onToggle(event, payload) {

    let fRef_GetTree = BrowserStoreConnection.getTree_05;
    let fRef_SetTree = BrowserStoreConnection.setTree_05;

    let node = payload.label.props.node; //payload is IBM Carbon Object
    UiActionHandler.handleToggle(fRef_GetTree, fRef_SetTree, node);

  }

  /**
    * This method rendes the nodes recursively to User Interface
    * @param {*} nodes List of Nodes
    * @param {*} frefRenderTreeNodes Pass-Through of render-method
    * @param {*} frefUiUpdate function to re-render tree
    * @param {*} frefOnToggle function to toggle tree-node
    * @returns a rendered Tree Node with all it's children
    */
  renderTreeNodes = (nodes, frefRenderTreeNodes, frefUiUpdate, frefOnToggle) =>
    nodes.map((node) => (
      <React.Fragment key={node.id}>
        {
          node.uicontrol.visible === true
            ? <React.Fragment key={node.id}>

              <TreeNode
                key={node.id} //satisfies react (in map a key is mandatory)

                id={node.id}
                label={NodeUiProvider.getUserInterface(node, frefUiUpdate)}
                isExpanded={node.uicontrol.expanded}
                onToggle={frefOnToggle}
              >
                {node.children && node.children.length > 0
                  ? frefRenderTreeNodes(node.children, frefRenderTreeNodes, frefUiUpdate, frefOnToggle)
                  : null}
              </TreeNode>


            </React.Fragment>
            : <React.Fragment key={node.id}>
            </React.Fragment>
        }
      </React.Fragment>
    ));


  /**
     * Event Handler for Field Changes
     * @param {*} fieldName 
     * @param {*} value 
     */
  functionHandleDataChange(fieldName, value) {

    if (fieldName === 'typeAhead') {

      let fRef_GetTree = BrowserStoreConnection.getTree_05;
      let fRef_SetTree = BrowserStoreConnection.setTree_05;

      let matchNodeIDs = UiActionHandler.searchNodeViaTypeAHead(fRef_GetTree, fRef_SetTree, value);
      //enforce re-render
      this.setState({
        timeStamp: new Date(),
        searchMatches: matchNodeIDs,
      });

    }
    this.setState({
      data: {
        ...this.state.data,
        [fieldName]: value,
      }
    });
  }

  /**
   * This method sets all search matches in Tree as selected
   * @param {*} searchMatches 
   */
  async functionSelectAllSearchMatches(searchMatches) {

    let fRef_GetTree = BrowserStoreConnection.getTree_05;
    let fRef_SetTree = BrowserStoreConnection.setTree_05;

    UiActionHandler.setSelectionForSearchMatches(fRef_GetTree, fRef_SetTree, searchMatches, true);

    this.updateThis();
  }

  /**
   * This method sets all search matches in Tree as de-selected
   * @param {*} searchMatches 
   */
  async functionDeSelectAllSearchMatches(searchMatches) {

    let fRef_GetTree = BrowserStoreConnection.getTree_05;
    let fRef_SetTree = BrowserStoreConnection.setTree_05;

    UiActionHandler.setSelectionForSearchMatches(fRef_GetTree, fRef_SetTree, searchMatches, false);

    this.updateThis();

  }

  render() {

    let fRef_GetTree = BrowserStoreConnection.getTree_05;
    let fRef_SetTree = BrowserStoreConnection.setTree_05;


    let treeData = BrowserStoreConnection.getTree_05();
    let frefRenderTreeNodes = this.renderTreeNodes.bind(this)
    let frefUiUpdate = this.updateThis.bind(this);
    let frefOnToggle = this.onToggle.bind(this);

    const { searchMatches } = this.state;
    let numberOfSearchMatches = searchMatches.length;
    let fRef_SelectAllSearchMatches = this.functionSelectAllSearchMatches.bind(this);
    let fRef_DeSelectAllSearchMatches = this.functionDeSelectAllSearchMatches.bind(this);


    return (
      <div>
        {treeData === null
          ?
          <InlineLoading
            description="..."
            iconDescription="..." />
          : <>
            <Table aria-label="Tree-Actions" style={{ width: '100%', height: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button
                      className="preQ_Wama_Profile_Button"
                      kind="ghost"
                      size="sm"
                      renderIcon={ExpandCategories}
                      onClick={() => UiActionHandler.expandAll(fRef_GetTree, fRef_SetTree, this.updateThis.bind(this))}
                    >
                      &nbsp;
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      className="preQ_Wama_Profile_Button"
                      kind="ghost"
                      size="sm"
                      renderIcon={CollapseCategories}
                      onClick={() => UiActionHandler.collapsAll(fRef_GetTree, fRef_SetTree, this.updateThis.bind(this))}
                    >
                      &nbsp;
                    </Button>
                  </TableCell>
                  <TableCell width="35%">
                    <FormComponent_TypeAheadField
                      mode={'U'}
                      id="PreQ_profile_entity_tree_header_type_ahead"
                      defaultValue={this.state.data.typeAhead}
                      entity='profile_entity_tree_header_type_ahead'
                      field='typeAhead'
                      onChangeFunction={this.functionHandleDataChange.bind(this)}
                    />
                  </TableCell>
                  <TableCell width="20%">
                    {(numberOfSearchMatches > 0)
                      ?
                      <>
                        <Button
                          className="preQ_Wama_Profile_Button"
                          kind="ghost"
                          size="sm"
                          renderIcon={Checkbox}
                          onClick={() => fRef_DeSelectAllSearchMatches(searchMatches)}
                        >
                          &nbsp;
                        </Button>
                        <Button
                          className="preQ_Wama_Profile_Button"
                          kind="ghost"
                          size="sm"
                          renderIcon={CheckboxChecked}
                          onClick={() => fRef_SelectAllSearchMatches(searchMatches)}

                        >
                          &nbsp;
                        </Button>

                      </>
                      : <>
                      </>}
                  </TableCell>

                </TableRow>
              </TableHead>
            </Table>
            <TreeView
              label="IBM Carbon TreeView"
            >
              {frefRenderTreeNodes(treeData, frefRenderTreeNodes, frefUiUpdate, frefOnToggle)}
            </TreeView>
          </>
        }
      </div>
    );
  }
}

export default Tree;
