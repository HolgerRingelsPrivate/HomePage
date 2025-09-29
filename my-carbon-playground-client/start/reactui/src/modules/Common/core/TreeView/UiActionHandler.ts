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

/**
 * This Handler interacts directly with a Tree Component
 * 
 * It handles events from the User Interface like
 *  - extend all
 *  - collapse all
 *  - selection / deselection of a Folder
 *  - selection / deselection of an Entry
 *  - search
 *  - reset
 *  - etc.
 * 
 * Within this event-handling it calls back-end methods to perform the related business-actions
 * (e.g. storing the modifications to application's data-layer - the Browser Store)
 * 
 */

import type { PojoJGraphtTreeNode, PojoJGraphtTreeNodeList, PojoJGraphtTreeHashMap } from './PojoJGraphtTreeNode';

import * as arrayFunctions from './../Arrays/ArrayFunctions';

import * as workerFunctions from './UiActionHandlerWorkFunctions';
import * as recursiveFunctions from './UiActionHandlerRecursiveFunctions';
import * as graphFunctions from './UiActionHandlerGraphFunctions';
import * as searchFunctions from './UiActionHandlerSearchFunctions';


/* +------------------------------------------------------------------------------- */
/* | Functions to handle ALL Nodes of Tree */
/* +------------------------------------------------------------------------------- */

/**
 * This function expands All Nodes of the graph 
 * @param treeGetFunction function used to pickup Tree from Browser Store
 * @param treeSetFunction function used to store Tree to Browser Store
 * @param callBack CallBack function to perform, when this function is done
 * @returns 
 */
export async function expandAll(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  callBack: () => void
) {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return;
  }

  //update tree: expand all
  recursiveFunctions.walkTree(tree, workerFunctions.expandNode);

  //save tree to browser store
  treeSetFunction(tree);

  //update Ui
  callBack();
}

/**
 * This function collapses All Nodes of the graph 
 */
export async function collapsAll(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  callBack: () => void
) {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return;
  }

  //update tree: collapse all
  recursiveFunctions.walkTree(tree, workerFunctions.collapseNode);

  //save tree to browser store
  treeSetFunction(tree);

  //update Ui
  callBack();
}


/* +------------------------------------------------------------------------------- */
/* | Functions to handle Tree Search */
/* +------------------------------------------------------------------------------- */

/**
 * This function handles a type-ahead search within tree.
 * 
 * It identifies all nodes, where label starts with a prefix
 * 
 * @param treeGetFunction function used to pickup Tree from Browser Store
 * @param treeSetFunction function used to store Tree to Browser Store
 * @param searchCriteria 
 * @returns an array with all node.ids, which matches the search-criteria (prefix)
 */
export function searchNodeViaTypeAHead(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  searchCriteria: string
): string[] {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return [];
  }

  if (searchCriteria === '') { 

    recursiveFunctions.walkTree(tree, workerFunctions.setNodeAsVisibleAndNonExpanded);
    recursiveFunctions.walkTree(tree, workerFunctions.setNodeAsSelectable);
    //save tree to browser store
    treeSetFunction(tree);

    return [];
  }

  //search for the ids of all leaves (= nodes without children), where the label starts with prefix
  //searchResult is an array of node.ids

  let flagSearchCaseSensitive = true; //MIGHT BE : THIS BECOMES A PARAMETER OF THIS FUNCTION IN FUTURE
  let flagIndentifyOnlyLeaves = true;  //MIGHT BE : THIS BECOMES A PARAMETER OF THIS FUNCTION IN FUTURE

  let searchResult: string[] | null = searchFunctions.searchForLabelsIncludingCriteria(tree, searchCriteria, flagSearchCaseSensitive, flagIndentifyOnlyLeaves);
  if (searchResult === null) {
    
    recursiveFunctions.walkTree(tree, workerFunctions.setNodeAsVisible)
    recursiveFunctions.walkTree(tree, workerFunctions.setNodeAsSelectable);

    //save tree to browser store
    treeSetFunction(tree);

    return [];
  }

  let hashMap: PojoJGraphtTreeHashMap = graphFunctions.captureGraphAsHashmap(tree);
  let searchResultTreeNodes: PojoJGraphtTreeNode[] = graphFunctions.pickUpAllNodesByNodeIDs(searchResult, hashMap);

  // identify a list of all node.ids, which are to be displayed as search result (incl. nodes with children)
  let listOfParentIDs: string[] = graphFunctions.pickUpAllParentIDsForASetOfNodes(hashMap, searchResultTreeNodes);

  let listToDisplay: string[] = unifyList(searchResult, listOfParentIDs);
  // set only those nodes as visible, which are in listOfiDsToDisplay
  recursiveFunctions.walkTreeWithFilter(tree, listToDisplay,
    workerFunctions.setNodeAsVisibleAndExpanded,
    workerFunctions.setNodeAsInvisibleAndNonExpanded);

  // set only those nodes as selectable, which are in listOfiDsToDisplay (to avoid group selections)
  recursiveFunctions.walkTreeWithFilter(tree, listOfParentIDs,
    workerFunctions.setNodeAsNonSelectable,
    workerFunctions.doNothing);



  //save tree to browser store
    treeSetFunction(tree);

  return searchResult;

}

/**
 * This method delivers a list of all node.ids, which are to be displayed as search-result
 * @param searchResult Search-Matches as array of node.ids
 * @param listOfParentIDsToDisplay Search-Matches' Parents as array of node.ids
 * @returns 
 */
function unifyList(searchResult: string[], listOfParentIDs: string[]): string[] {
  let result: string[] = [];
  for (const id of searchResult) {
    arrayFunctions.addStringUnique(result, id);
  }
  for (const id of listOfParentIDs) {
    arrayFunctions.addStringUnique(result, id);
  }
  return result;
}



/**
 * This method selects all identified search matches
 * @param treeGetFunction function used to pickup Tree from Browser Store
 * @param treeSetFunction function used to store Tree to Browser Store
 * @param searchMatches string-array holding all node.id of search matches
 * @param selected true: set as SELECTED. false: set as NOT SELECTED
 */
export function setSelectionForSearchMatches(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  searchMatches: string [],
  selected : boolean
): void {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return;
  }

  if (selected) {
    recursiveFunctions.walkTreeWithFilter(tree, searchMatches, workerFunctions.setNodeSeleted, workerFunctions.doNothing);
  } else {
    recursiveFunctions.walkTreeWithFilter(tree, searchMatches, workerFunctions.setNodeUnSeleted, workerFunctions.doNothing);
  }

  //save tree to browser store
  treeSetFunction(tree);

}


/* +------------------------------------------------------------------------------- */
/* | Functions to handle ONE Node within Tree  */
/* +------------------------------------------------------------------------------- */


/**
 * This method starts, when a user expanded or collapsed a TreeNode (toggle)
 * Corrispondingly to the toggle in ui, it sets the node.uicontrol.expanded flag of the node in Browser-Store
 * @param treeGetFunction function used to pickup Tree from Browser Store
 * @param treeSetFunction function used to store Tree to Browser Store
 * @param node Node, on which the toggle has been changed
 * @returns 
 */
export function handleToggle(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  node: PojoJGraphtTreeNode) {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return;
  }

  //toggle node.uicontrol.expanded
  recursiveFunctions.walkTreeNode(node, tree, workerFunctions.toggleNodeExpanded);

  //save tree to browser store
  treeSetFunction(tree);

}

/**
 * This functions selects one specific Node of the tree
 * @param treeGetFunction function used to pickup Tree from Browser Store
 * @param treeSetFunction function used to store Tree to Browser Store
 * @param node the Node to interact on
 * @param graph Tree
 * @param callBack CallBack function to perform, when this function is done
 */
export async function toggleOneNodeSelection(
  treeGetFunction: () => PojoJGraphtTreeNodeList | null,
  treeSetFunction: (newTree: PojoJGraphtTreeNodeList) => void,
  node: PojoJGraphtTreeNode, 
  callBack: () => void) {

  //read tree from browser store
  let tree: PojoJGraphtTreeNodeList | null = treeGetFunction();
  if (tree === null) {
    return;
  }

  let currentSelected = node.uicontrol.selected;

  //toggle selection for the node
  recursiveFunctions.walkTreeNode(node, tree, workerFunctions.toggleNodeSeletion);

  //set all children the sameway as the current (de/-selected)
  let modified: PojoJGraphtTreeNode[] = [];
  modified.push(node);

  //identify all childs and sub-childs
  let childs: string[] = graphFunctions.pickUpAllChildIDs(node);

  if (currentSelected === true) {
    recursiveFunctions.walkTreeWithSelectionFilter(tree, childs, workerFunctions.setNodeUnSeleted, workerFunctions.doNothing, modified);
  } else {
    recursiveFunctions.walkTreeWithSelectionFilter(tree, childs, workerFunctions.setNodeSeleted, workerFunctions.doNothing, modified);
  }

  // from array of modified pick up
  // - all nodes, which do NOT have children (so pick-kup the leaves)
  // - from these nodes build an array for all entity_ids
  let payloadIDs: string[] = graphFunctions.identifyUniqueEntityIdOfChildlessNodes(modified);


  // loop over the tree (recursively)
  // node of the tree: check, if entity_id appears in list of entity_ids (there are only leaves)
  // if yes: modify selected based on currentSelected
  if (currentSelected === true) {
    recursiveFunctions.walkTreeWithSelectedPayloadIDs(tree, payloadIDs, workerFunctions.setNodeUnSeleted);
  } else {
    recursiveFunctions.walkTreeWithSelectedPayloadIDs(tree, payloadIDs, workerFunctions.setNodeSeleted);
  }

  //save tree to browser store
  treeSetFunction(tree);

  //update Ui
  callBack();

}










