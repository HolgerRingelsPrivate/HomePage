/* **************************************************************************************
 *
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2025
 * All Rights Reserved
 *
 * US Government Users Restricted Rights -Use, duplication or
 *
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 ************************************************************************************** */
'use client';

import React, { Component } from 'react';

import { Tooltip, Button, Modal } from "@carbon/react";

import {
    Unknown, Folder, FolderDetails, FunctionMath, Calculation, StarFilled,
    ExpandCategories, CollapseCategories,
    Information, Edit, ResultDraft,
    Checkbox, CheckboxChecked
} from "@carbon/icons-react";
import * as CT_carbonplay_VertexTypes from './../../../Common/codetable/carbonplay/CT_carbonplay_VertexTypes'; 

import * as UiActionHandler from './../../../Common/core/TreeView/UiActionHandler';
import * as BrowserStoreConnection from './../backend/BrowserStoreConnection';

import NodeModalInfo from './NodeModalInfo';
import EntityUiIconProvider from './EntityUiIconProvider';
import * as EntityUiIconProviderFunctions from './EntityUiIconProviderFunctions';

import { v4 as uuidv4 } from 'uuid';
import { FormLabel } from '@carbon/react';

class EntityUiProviderContent extends Component {

    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            id: this.constructor.name + ' ' + uuidv4(),
            isModalInfoEntityOpen: false,
        };
    }


    setIsModalInfoOpen(node, val) {
        this.setIsModalInfoEntityOpen(true);
    }

    setIsModalInfoEntityOpen(val) {
        this.setState({ isModalInfoEntityOpen: val });
    }

    render() {
        const { node, hrefUiUpdate } = this.props;

        let { isModalInfoEntityOpen } = this.state;

        let refIsModalInfoOpen = this.setIsModalInfoOpen.bind(this);
        let refIsModalInfoEntityOpen = this.setIsModalInfoEntityOpen.bind(this);

        let checkBoxIcon = EntityUiIconProviderFunctions.getSelectCheckboxIcon(node);

        let fRef_GetTree = BrowserStoreConnection.getTree_05;
        let fRef_SetTree = BrowserStoreConnection.setTree_05;

        let vertexType = "";
        try {
            vertexType = node.payload.vertexType;
        } catch (error) {
            vertexType = "";
        }

        return (
            <>
                <div className="thisApp_Tree_Entry">
                    <table>
                        <tbody>
                            <tr>
                                <td width="2000px">
                                    <EntityUiIconProvider node={node} />
                                    {
                                        (node.uicontrol.selectable === true)
                                            ?
                                            <Button
                                                className="thisApp_Tree_Button"
                                                kind="ghost"
                                                size="sm"
                                                renderIcon={checkBoxIcon}
                                                onClick={() => UiActionHandler.toggleOneNodeSelection(fRef_GetTree, fRef_SetTree, node, hrefUiUpdate)}
                                            >
                                                &nbsp;
                                            </Button>

                                            : <>&nbsp;</>
                                    }

                                    &nbsp;&nbsp;&nbsp;
                                    {node.label}
                                </td>
                                <td>
                                    <Button
                                        className="thisApp_Tree_Button"
                                        kind="ghost"
                                        size="sm"
                                        renderIcon={Information}
                                        onClick={() => refIsModalInfoOpen(node, true)}
                                    >
                                        &nbsp;
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <NodeModalInfo open={isModalInfoEntityOpen} setOpen={refIsModalInfoEntityOpen} node={node} />

                </div>
                
            </>
        );
    }




}



export default EntityUiProviderContent;
