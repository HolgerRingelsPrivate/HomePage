import i18n from './../../../../singletons/i18n/I18n';

export const CODE = {
  UNDEFINED: "",
  JS_EXAMPLE_BUTTONS: "EXAMPLE_BUTTONS",
  JS_EXAMPLE_TREE: "EXAMPLE_TREE",
  JS_EXAMPLE_TREE_SELF_FILLED: "EXAMPLE_TREE_SELF_FILLED",
  JS_EXAMPLE_TREE_BACKEND_FILLED_1: "EXAMPLE_TREE_BACKEND_FILLED",
  JS_EXAMPLE_TREE_BACKEND_FILLED_2: "EXAMPLE_TREE_BACKEND_FILLED_VIA_LIST",
}


export function getTextForCode(code) {

  if (code === null)      		  {return CODE.UNDEFINED;}
  if (code === undefined) 		  {return CODE.UNDEFINED;}
  if (code === CODE.UNDEFINED) 	{return CODE.UNDEFINED;}

  let searchCode = code;
  let indexCommata = code.indexOf(','); //-1 means: single code
  if (indexCommata !== -1) {
    searchCode = searchCode.substring(0, indexCommata)
  } 

  let items =  getUiItems();
  let i = 0;
  while (i < items.length) {
    let item = items[i];
    if (item.code === searchCode) {
      if (indexCommata === -1) {
        return item.text;
      } else {
        return item.text + ", ...";
      } 
    } 
    i++;
  }  
  return CODE.UNDEFINED;
}  

 



export function getItemForCode(code) {

  if (code === null)      		{return null;}
  if (code === undefined) 		{return null;}

  let items =  getUiItems();
  let i = 0;
  while (i < items.length) {
    let item = items[i];
    if (item.code === code) {
    	return item;
    } 
    i++;
  }  
  return null;
}  


export function getCodeForText(text) {

  let items =  getUiItems();
  let i = 0;
  while (i < items.length) {
    let item = items[i];
    if (item.text === text) {
    	return item.code;
    } 
    i++;
  }  
  return "";
}  



export function getUiItems() {

  let uiLanguage = i18n.getLocaleInUse();   

  let result = null;

  //undefined => return english
  if (uiLanguage === null)  { 
    result = getUiItems_en();  
    return result;
  }

  //deliver language not-"en"-language: de
  if (uiLanguage === "de")  { 
    result = getUiItems_de (); 
    return result;
  }

  //no other language then "en"
  result = getUiItems_en(); 
  return result;
}  




// en
export function getUiItems_en () {
  const items = [
      {
        code: CODE.JS_EXAMPLE_BUTTONS,
        text: 'Buttons'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE,
        text: 'Tree'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_SELF_FILLED,
        text: 'Tree (via Java Script filled)'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1,
        text: 'Tree (filled via Backend)'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2,
        text: 'Tree (filled via Backend-List)'
      }, 
      {
        code: '',
        text: ''
      }
    ];

	delete items[items.length-1];  
    return items

}



// de
export function getUiItems_de () {
  const items = [
      {
        code: CODE.JS_EXAMPLE_BUTTONS,
        text: 'Schaltflächen (Buttons)'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE,
        text: 'Baum'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_SELF_FILLED,
        text: 'Baum (via JavaScript befüllt)'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1,
        text: 'Baum (via BackEnd befüllt)'
      }, 
      {
        code: CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2,
        text: 'Baum (via BackEnd-Liste befüllt)'
      }, 
      {
        code: '',
        text: ''
      }
    ];

	delete items[items.length-1];  
    return items

}




