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
/* | Recursive Functions handle Graphs Tree Nodes   */
/* +------------------------------------------------------------------------------- */

import type { PojoJGraphtTreeNode } from './PojoJGraphtTreeNode';

/**
 * Walker over all nodes of the tree to modify ALL nodes with the handed over workFunction
 * @param nodes all nodes
 * @param workFunction workFunction to use
 */
export function walkTree(nodes: PojoJGraphtTreeNode[], workFunction: (node : PojoJGraphtTreeNode) => void ): void {
  for (const node of nodes) {
    
    // Do something with the current node
    workFunction(node);

    // Recursively visit children
    if (node.children && node.children.length > 0) {
      walkTree(node.children, workFunction);
    }
  }
}


/**
 * Walker over all nodes of the tree to modify ONE node with the handed over workFunction
 * @param nodeToHandle node to work on
 * @param nodes all nodes
 * @param workFunction workFunction to use, wehn the node is identified
 */
export function walkTreeNode(nodeToHandle : PojoJGraphtTreeNode, nodes: PojoJGraphtTreeNode[], workFunction: (node : PojoJGraphtTreeNode) => void ): void {
  for (const node of nodes) {
 
    //identify node in tree
    if (node.id === nodeToHandle.id) {
        workFunction(node);
    }

    // Recursively visit children
    if (node.children && node.children.length > 0) {
      walkTreeNode (nodeToHandle, node.children, workFunction);
    }
  }
}


/**
 * This functions walks recursively along the complete Tree.
 * IF a node's id is listed in Match Filter,
 * THEN Function-On-Match is performed
 * ELSE Function-On-No-Match is peformed
 * @param nodes Tree
 * @param matchFilter Match-Filter 
 * @param matchFunction Function-On-Match is performed on each node, where node's id is listed in Match-Filter
 * @param noMatchFunction Function-On-No-Match is peformed on each node, where node's id is NOT listed in Match-Filter
 * @param modified array of modified Nodes (filled recursively)
 */
export function walkTreeWithSelectionFilter(
  nodes: PojoJGraphtTreeNode[], 
  matchFilter: string[], 
  matchFunction: (node : PojoJGraphtTreeNode) => void, 
  noMatchFunction: (node : PojoJGraphtTreeNode) => void,
  modified: PojoJGraphtTreeNode[]  )
: void {

  for (const node of nodes) {
    if (matchFilter.includes(node.id)) {
      matchFunction(node);
      modified.push(node);
    } else {
      noMatchFunction(node);
    }

    // Recursively visit children
    if (node.children && node.children.length > 0) {
      walkTreeWithSelectionFilter (node.children, matchFilter, matchFunction, noMatchFunction, modified);
    }

  }

}

/**
 * This method handles all nodes of a tree with a workFunction based on a particular filter
 * 
 * The filter is:  node's payload.id is in an array-of-given-payload-ids
 * 
 * It works recursively.
 * 
 * 
 * @param nodes all nodes of a tree
 * @param filterPayloadIDs array-of-given-entity-ids as filter
 * @param workFunction Function to perfrom, when the node passes the filter
 */
export function walkTreeWithSelectedPayloadIDs(
  nodes: PojoJGraphtTreeNode[], 
  filterPayloadIDs : string[], 
  workFunction: (node : PojoJGraphtTreeNode) => void
) {

    for (const node of nodes) {

      let payloadId : string = node.payload.id;
      if (filterPayloadIDs.includes(payloadId)) {
        workFunction(node);
      }

          // Recursively visit children
      if (node.children && node.children.length > 0) {
        walkTreeWithSelectedPayloadIDs (node.children, filterPayloadIDs, workFunction);
      }

    }

}


/**
 * This method handles all nodes of a tree with one of 2 workFunctions based on a particular filter
 * 
 * The filter is:  array of node.ids
 * 
 * IF Node's id is mentioned in filter, THEN foundFunction is performed on the node, ELSE notFoundFunction is performed on the node
 * 
 * It works recursively.
 * 
 * 
 * @param nodes all nodes of a tree
 * @param filterIDs array of node.ids
 * @param foundFunction Function to perfrom, when the node IS mentioned in filter
 * @param notFoundFunction Function to perfrom, when the node is NOT mentioned in filter
 */
export function walkTreeWithFilter(
  nodes: PojoJGraphtTreeNode[], 
  filterIDs : string[], 
  foundFunction: (node : PojoJGraphtTreeNode) => void,
  notFoundFunction: (node : PojoJGraphtTreeNode) => void
) {

    for (const node of nodes) {

      let nodeId : string = node.id;
      if (filterIDs.includes(nodeId)) {
        foundFunction(node);
      } else {
        notFoundFunction(node);
      }

      // Recursively visit children
      if (node.children && node.children.length > 0) {
        walkTreeWithFilter (node.children, filterIDs, foundFunction, notFoundFunction);
      }

    }

}

