export type PojoPayloadUiControl = {
    visible : boolean,
    expanded : boolean,
  }
  
  export type PojoJGraphtTreeNode = {
    id: string; 
    label: string;
    value: string;
    parentId?: string //id of parent (choose null for 'no Parent')
    payload?: any;    //Payload (typically a Pojo ins JSON-Format), can be null
    uicontrol?: PojoPayloadUiControl;   //Payload to control ui
    children: PojoJGraphtTreeNode[];
  }
  
  export type PojoJGraphtTreeNodeList = PojoJGraphtTreeNode[]