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

export type PojoPayloadUiControl = {
  visible : boolean,
  expanded : boolean,
  selectable : boolean,
  selected : boolean,
}

export type PojoJGraphtTreeNode = {
  id: string; 
  label: string;
  value: string;
  parentId?: string //id of parent (choose null for 'no Parent')
  payload?: any;    //Payload (typically a Pojo ins JSON-Format), can be null
  uicontrol : PojoPayloadUiControl;
  children: PojoJGraphtTreeNode[];
}

export type PojoJGraphtTreeNodeList = PojoJGraphtTreeNode[]

export type PojoJGraphtTreeHashMap = Map<string, PojoJGraphtTreeNode>;

export type PojoPayloadAbstract = {
	clazz : string,
	id : string
}



