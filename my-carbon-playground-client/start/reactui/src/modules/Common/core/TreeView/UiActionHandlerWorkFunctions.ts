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


/* +------------------------------------------------------------------------------- */
/* | Work Functions to handle one Node   */
/* +------------------------------------------------------------------------------- */

import type { PojoJGraphtTreeNode } from './PojoJGraphtTreeNode';

/**
 * This method just does nothing on the node
 * @param node 
 * @returns 
 */
export function doNothing(node : PojoJGraphtTreeNode) {
  return;
}


/**
 * This method set node.uicontrol.selected to true
 * @param node 
 */
export function setNodeSeleted(node : PojoJGraphtTreeNode) {
  node.uicontrol.selected = true;
}

/**
 * This method set node.uicontrol.selected to false
 * @param node 
 */
export function setNodeUnSeleted(node : PojoJGraphtTreeNode) {
  node.uicontrol.selected = false;
}

/**
 * This method toggles node.uicontrol.selected
 * @param node 
 */
export function toggleNodeSeletion(node : PojoJGraphtTreeNode) {
    if (node.uicontrol.selected === true) {
        node.uicontrol.selected = false;
    } else {
        node.uicontrol.selected = true;
    }    
}

/**
 * This method toggles node.uicontrol.expanded
 * @param node 
 */
export function toggleNodeExpanded(node : PojoJGraphtTreeNode) {
    if (node.uicontrol.expanded === true) {
        node.uicontrol.expanded = false;
    } else {
        node.uicontrol.expanded = true;
    }    
}


/**
 * This function is used to enforces node.uicontrol.expanded = true
 * @param node 
 */
export function expandNode(node : PojoJGraphtTreeNode) {
    node.uicontrol.expanded = true;
}

/**
 * This function is used to enforces node.uicontrol.expanded = false
 * @param node 
 */
export function collapseNode(node : PojoJGraphtTreeNode) {
    node.uicontrol.expanded=false;
}


/**
 * This function is used to enforce.node.uicontrol.visible = true
 * @param node 
 */
export function setNodeAsVisible(node : PojoJGraphtTreeNode) {
  node.uicontrol.visible = true;
}

/**
 * This function is used to enforce.node.uicontrol.visible = true
 * @param node 
 */
export function setNodeAsInvisible(node : PojoJGraphtTreeNode) {
  node.uicontrol.visible = false;
}

/**
 * This function is used to enforce.node.uicontrol.visible = true
 * 
 * If the node has children, then it is also expanded
 * 
 * @param node 
 */
export function setNodeAsVisibleAndExpanded(node : PojoJGraphtTreeNode) {
  node.uicontrol.visible = true;

  //if node has children
  if (node.children && node.children.length > 0) {
    node.uicontrol.expanded = true;
  }
}

/**
 * This function is used to enforce.node.uicontrol.visible = false
 * 
 * If the node has children, then it is also not expanded
 * 
 * @param node 
 */
export function setNodeAsInvisibleAndNonExpanded(node : PojoJGraphtTreeNode) {
  node.uicontrol.visible = false;

  //if node has children
  if (node.children && node.children.length > 0) {
    node.uicontrol.expanded = false;
  }
}

/**
 * This function is used to enforce.node.uicontrol.visible = true
 * 
 * If the node has children, then it is also not expanded
 * 
 * @param node 
 */
export function setNodeAsVisibleAndNonExpanded(node : PojoJGraphtTreeNode) {
  node.uicontrol.visible = true;

  //if node has children
  if (node.children && node.children.length > 0) {
    node.uicontrol.expanded = false;
  }
}


/**
 * This function is used to enforce node.uicontrol.selectable = false
 * 
 * If the node has children, then it is also not expanded
 * 
 * @param node 
 */
export function setNodeAsNonSelectable(node : PojoJGraphtTreeNode) {
  node.uicontrol.selectable = false;

}

/**
 * This function is used to enforce node.uicontrol.selectable = true
 * 
 * If the node has children, then it is also not expanded
 * 
 * @param node 
 */
export function setNodeAsSelectable(node : PojoJGraphtTreeNode) {
  node.uicontrol.selectable = true;

}