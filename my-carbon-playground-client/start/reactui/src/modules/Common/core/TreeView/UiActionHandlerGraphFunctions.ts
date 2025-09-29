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
/* | Graph Functions 
/* |   - identification of parents
/* |   - identification of childs
/* |   - provide tree as hashMap
/* |   - identification of nodes with a particular characteristic
/* |   - pick up all Nodes by node.ids
/* +------------------------------------------------------------------------------- */

import type { PojoJGraphtTreeNode, PojoJGraphtTreeNodeList, PojoJGraphtTreeHashMap } from './PojoJGraphtTreeNode';

import * as arrayFunctions from './../Arrays/ArrayFunctions';


/* +------------------------------------------------------------------------------- */
/* | Helper Functions to identify IDs of all Parents for a Node  */
/* +------------------------------------------------------------------------------- */

/**
 * This function identifies all parents for an ARRAY OF NODES based on graph-information in HashMap Form (node.id => node)
 * @param hashMap  (node.id => node)
 * @param nodes Array of nodes to inspect (Search fo Parents)
 * @param ids of parents (array of strings), where no parentID occurs more than once
 */
export function pickUpAllParentIDsForASetOfNodes(hashMap : PojoJGraphtTreeHashMap, nodes : PojoJGraphtTreeNode[]): string[] {

  
  let result : string[] = [];
  for (const node of nodes) {
    let nodeParentIdArray : string[] = pickUpAllParentIDsForOneNode(hashMap, node);
    for (const parentID of nodeParentIdArray) {
      if (!result.includes(parentID)) {
        result.push(parentID);
      }
    }    
  }
  return result;

}

/**
 * This function identifies all parents for ONE NODE based on graph-information in HashMap Form (node.id => node)
 * @param hashMap  (node.id => node)
 * @param node The Node to inspect (Search fo Parents)
 * @returns ids of parents (array of strings) 
 */
export function pickUpAllParentIDsForOneNode(hashMap : PojoJGraphtTreeHashMap, node : PojoJGraphtTreeNode): string[] {
  let result : string[] = [];

  let currentNode = node;

  while (currentNode && currentNode.parentId) {
    let parentNode = hashMap.get(currentNode.parentId);
    if (!parentNode) break;

    result.push(parentNode.id);
    currentNode = parentNode;
  } 
  return result;
}




/* +------------------------------------------------------------------------------- */
/* | Helper Functions to delivers all nodes of the graph as Hashmap (node.id => node)
/* +------------------------------------------------------------------------------- */

/**
 * This function delivers all nodes of the graph as Hashmap (node.id => node)
 * @param nodes
 * @returns Hashmap (node.id => node)
 */
export function captureGraphAsHashmap(nodes : PojoJGraphtTreeNode[] ) : PojoJGraphtTreeHashMap {

    let result: PojoJGraphtTreeHashMap = new Map<string, PojoJGraphtTreeNode>();

    captureGraphAsHashmapRecursively(nodes, result);

    return result;
}

/**
 * This method os the recursive part of the function captureGraphAsHashmap();
 * @param nodes 
 * @param result 
 * @returns 
 */
function captureGraphAsHashmapRecursively(nodes : PojoJGraphtTreeNode[], result: PojoJGraphtTreeHashMap ) {

  for (const node of nodes) {

    //insert node to result
    result.set(node.id, node);
    
    let hasChildren : boolean = (node.children && node.children.length > 0);

    if (hasChildren) {
      captureGraphAsHashmapRecursively(node.children, result )
    }

  }

  return result;
} 


/* +------------------------------------------------------------------------------- */
/* | Helper Functions to identify nodes with a particular characteristic
/* +------------------------------------------------------------------------------- */

/**
  * This method identifies from a list of TreeNodes all nodes, which do NOT have children.
  * 
  * From these nodes the entity_ids are identified
  * 
  * All entity_ids are pushed into a resulting array, where each entity_id occurs only once
  * 
  * @param nodes The list of node to inspect
  * @returns list of node.ids
  */ 
export function identifyUniqueEntityIdOfChildlessNodes(nodes : PojoJGraphtTreeNode[]  ) : string[] {

  let result : string[] = [];

  for (const node of nodes) {

        //if node has children, that skip it
        if (node.children && node.children.length > 0) {
          continue;
        }
        
        if (node.payload) {
          let payload_id : string = node.payload.id;
          arrayFunctions.addStringUnique(result, payload_id);
        }

  }
  return result; 
}


/* +------------------------------------------------------------------------------- */
/* | Helper Functions to identify IDs of Childs for a Node  */
/* +------------------------------------------------------------------------------- */

/**
 * This function picks up an array of ids, where each id identifies a Node,
 * 
 * which is child of node.
 * 
 * It works recursively and finds all childs ans sub-childs on deeper levels
 * @param node 
 * @returns an Array of Strings with all IDs of childs (and sub-childs)
 */
export function pickUpAllChildIDs(node : PojoJGraphtTreeNode): string[] {
  let result : string[] = []; 
  pickUpAllChildIDsRecursively(node, result, 0);
  return result;
}
/**
 * This is the recursive part of function pickUpAllChildIDs
 * 
 * It should only be called from pickUpAllChildIDs 
 * 
 * @returns an Array of Strings with all IDs of childs (and sub-childs)
 */
function pickUpAllChildIDsRecursively(node : PojoJGraphtTreeNode, current : string[], level : number): string[] {
  
  //the starting node is not a child of it's own
  if (level > 0) {
    current.push(node.id);
  }
  level = level + 1;

  //if node has children
  if (node.children && node.children.length > 0) {

    //then handle all children
    let childs = node.children;
    for (const child of childs) {
        pickUpAllChildIDsRecursively(child, current, level);
    }
  }

  return current;
}

/* +------------------------------------------------------------------------------- */
/* | Helper Functions to pick up all Nodes by node.ids
/* +------------------------------------------------------------------------------- */

/**
 * This function delivers an array of all PojoJGraphtTreeNodes, which can be identified in Hashmap ( node.id => node)
 * 
 * Search is done by an array of all nodeIds to search for in HashMap
 * 
 * If a nodeId (from array) could not be found in HashMap, then this nodeId is ignored
 * 
 * @param nodeIds array of all nodeIds to search for in HashMap
 * @param hashMap Hashmap ( node.id => node)
 */
export function pickUpAllNodesByNodeIDs(nodeIds : string[], hashMap : PojoJGraphtTreeHashMap) : PojoJGraphtTreeNode[] {
  let result : PojoJGraphtTreeNode[] = [];
  for (const nodeId of nodeIds) {
    let currentNode : PojoJGraphtTreeNode | undefined = hashMap.get(nodeId);
    if (currentNode !== undefined) {
      result.push(currentNode);
    }
  }
  return result;
}

