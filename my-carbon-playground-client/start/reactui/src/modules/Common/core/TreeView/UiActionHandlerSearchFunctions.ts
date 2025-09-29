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

import type { PojoJGraphtTreeNode } from './PojoJGraphtTreeNode';

/* +------------------------------------------------------------------------------- */
/* | Helper Functions to search  */
/* +------------------------------------------------------------------------------- */


/**
 * This function searches for all nodes, in which node.label starts with a prefix.
 * 
 * This can be nodes or leaves 
 * 
 * This function supports for example a type-ahead-search
 * 
 * The search can be performed case-sensitive or non-case-sensitive
 * 
 * @param nodes the graph
 * @param searchCriteria The Criteria to search for in node.label 
 * @param caseSensitive  true: search case-sensitive,  false: search non-case-sensitive
 * @param onlyLeaves true: only nodes without children are delivered
 * @returns array of matching node.ids
 */
export function searchForLabelsIncludingCriteria(nodes: PojoJGraphtTreeNode[], searchCriteria: string, caseSensitive: boolean, onlyLeaves: boolean) : string[] | null {
  let result : string[] = []; //= array of nodes
  searchForLabelsIncludingCriteriaRecursively(nodes, searchCriteria, caseSensitive, onlyLeaves, result);
  return result;
}


/**
 * This is the recursive part: searchForLabelsIncludingCriteriaRecursively()
 * @param nodes the graph
 * @param searchCriteria The Prefix to search for in node.label 
 * @param caseSensitive  true: search case-sensitive,  false: search non-case-sensitive
 * @param onlyLeaves true: only nodes without children are delivered
 * @param current array to fill with node.id (on match)
 */
function searchForLabelsIncludingCriteriaRecursively(nodes: PojoJGraphtTreeNode[], searchCriteria: string, caseSensitive: boolean, onlyLeaves: boolean ,current : string[] ): void {
    for (const node of nodes) {
    
      let sLabel = node.label;
      let sSearch = searchCriteria;
      if (!caseSensitive) {
        sLabel = sLabel.toLowerCase();
        sSearch = sSearch.toLowerCase();
      }

      let hasChildren : boolean = (node.children && node.children.length > 0);

      //check for prefix
      if (sLabel.includes(sSearch)) {

        
        if (onlyLeaves) { 
          //only a node without children is expected in result
          if (hasChildren === false) {
            current.push(node.id);
          }
        } else {
          //any node (with or without children) is expected in result
          current.push(node.id);
        }

      }

    // Recursively visit children
    if (hasChildren) {
      searchForLabelsIncludingCriteriaRecursively(node.children, searchCriteria, caseSensitive, onlyLeaves, current);
    }
  }
}
