import * as XRelationCommon_Tools from './XRelationCommon_Tools';

/************************************************************************************
 *  D I S P L A Y    T O U C H E D    L I S T
 ************************************************************************************/

export function deliverTouchedList(serverData) {
  if (serverData === null) {
    return [];
  }
  if (serverData === undefined) {
    return [];
  }

  let leftEntityColumnsToDisplay = deliverColumnsToDisplay(serverData);

  let model = serverData.metaData.model;
  let codeTableItems = serverData.metaData.codeTableItems;
  let sourceData = serverData.result.list;

  let tableContent = [];
  let rowContent = [];
  var arrayLength = sourceData.length;
  var fieldAmount = leftEntityColumnsToDisplay.length;

  for (var i = 0; i < arrayLength; i++) {
    //loop over entries from serverData
    let object = sourceData[i];
    let picklistFieldVals = object.xRelPicklistFieldVals;

    for (var j = 0; j < fieldAmount; j++) {
      //loop over columns to display
      let fieldName = leftEntityColumnsToDisplay[j].code;

      for (var k = 0; k < picklistFieldVals.length; k++) {
        //pick value
        let picklistFieldVal = picklistFieldVals[k];
        if (picklistFieldVal.field === fieldName) {
          let colDisplayValue = XRelationCommon_Tools.getFieldValueToDisplay(
            fieldName,
            picklistFieldVal.value,
            model,
            codeTableItems
          );
          rowContent.push(colDisplayValue);
        }
      }
    }

    tableContent.push(rowContent);
    rowContent = [];
  }

  return tableContent;
}

// ********************************************************************************
// * D E L I V E R    F R O M     E N T I T Y   B U S I N E S S     M O D E L
// ********************************************************************************

export function deliverColumnsToDisplay(serverData) {
  var result = [];

  let model = serverData.metaData.model;
  let attribs = model.entityAttributes;
  let labels = model.entityLabels;

  var result = XRelationCommon_Tools.deliverColumnsToDisplay(attribs, labels);
  return result;
}
