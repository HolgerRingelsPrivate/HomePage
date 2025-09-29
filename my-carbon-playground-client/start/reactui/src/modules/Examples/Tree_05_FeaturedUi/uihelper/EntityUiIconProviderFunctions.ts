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

import type { PojoJGraphtTreeNode } from './../../../Common/core/TreeView/PojoJGraphtTreeNode'

import { Checkbox, CheckboxChecked, Unknown } from "@carbon/icons-react";

import * as CT_carbonplay_VertexTypes from './../../../Common/codetable/carbonplay/CT_carbonplay_VertexTypes'; 

/**
 * This method delivers the  Icon to use based on node's attribute 'selected'
 * @param node 
 * @returns Checkbox or CheckboxChecked
 */
export function getSelectCheckboxIcon(node: PojoJGraphtTreeNode) {

    switch (node.payload.vertexType) {
        case CT_carbonplay_VertexTypes.CODE.JS_NORMAL:
            if (node.uicontrol.selected) {
                return CheckboxChecked;
            } else {
                return Checkbox;
            }
        case CT_carbonplay_VertexTypes.CODE.JS_TAXONOMY:
            if (node.uicontrol.selected) {
                return CheckboxChecked;
            } else {
                return Checkbox;
            }

        default:
            return Unknown;    

    }


}