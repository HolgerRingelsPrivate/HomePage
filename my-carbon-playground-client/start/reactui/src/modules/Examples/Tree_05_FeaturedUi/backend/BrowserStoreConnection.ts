import type { PojoJGraphtTreeNodeList } from './../../../Common/core/TreeView/PojoJGraphtTreeNode';

import appSession from './../../../../singletons/session/AppSession';
import * as AppSessionData from './../../../../singletons/session/AppSessionData';

/**
 * This method retrieves TREE_05 from BrowserStore
 * @returns  PojoJGraphtTreeNodeList or null (if not available)
 */
export function getTree_05() : PojoJGraphtTreeNodeList | null{
    let sessionClass = AppSessionData.OBJECT_DEF.TREE_05;
    let userSessionObject : any = appSession.getObject(sessionClass);
    if (userSessionObject === undefined) {
     return null;
    }
    let result : PojoJGraphtTreeNodeList = userSessionObject;
    return result;
 }
 
 /**
  * This method stores TREE_05 to BrowserStore
  * @param graph PojoJGraphtTreeNodeList
  */
 export function setTree_05( graph : PojoJGraphtTreeNodeList) {
     let sessionClass = AppSessionData.OBJECT_DEF.TREE_05;
     appSession.setData(sessionClass, graph);
 
 }
 
 /**
  * This method removes TREE_05 from BrowserStore
  */
 export function deleteTREE_05( ) {
     let sessionClass = AppSessionData.OBJECT_DEF.TREE_05;
     appSession.deleteData(sessionClass);
 
 }
