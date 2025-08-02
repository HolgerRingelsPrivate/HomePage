import * as XRelationCommon_Tools from './XRelationCommon_Tools';
import i18n from './../../../singletons/i18n/I18n';

// ********************************************************************************
// * D E L I V E R    F R O M     E N T I T Y   B U S I N E S S     M O D E L
// ********************************************************************************

export function deliverColumnsToDisplay(entityBusinessModel) {
  let attribs = entityBusinessModel.model.entityAttributes;
  let labels = entityBusinessModel.model.entityLabels;

  var result = XRelationCommon_Tools.deliverColumnsToDisplay(attribs, labels);
  return result;
}

/************************************************************************************
 *  L I S T  ***  T Y P E _ A H E A D _ S E L E C T I O N   -   I T E M S
 ************************************************************************************/

export function deliverSearchFields(entityBusinessModel) {
  var result = [];
  let uiLang = i18n.getLocaleInUse();

  let fields = entityBusinessModel.searchFields;
  //Loop over fields
  let i = 0;
  while (i < fields.length) {
    let field = fields[i];

    let j = 0;
    let i18n = '?';
    while (j < field.i18nLabels.length) {
      let i18nLabel = field.i18nLabels[j];
      if (i18nLabel.key === uiLang) {
        i18n = i18nLabel.val;
      }
      j++;
    }

    let searchFieldObj = {
      code: field.field,
      text: i18n,
    };

    result.push(searchFieldObj);

    i++;
  }
  return result;
}

export function get_ListTypeAHeadSelectableItems_ItemForCode(
  entityBusinessModel,
  code
) {
  let candidates = deliverSearchFields(entityBusinessModel);
  let i = 0;
  while (i < candidates.length) {
    if (candidates[i].code === code) {
      return candidates[i];
    }
    i++;
  }
  return null;
}

/************************************************************************************
 *  D I S P L A Y    S E L E C T    L I S T
 ************************************************************************************/

/**
 * This method delivers a displayable list of values derived from serverData
 * It delivers those columns, which are defined in rightEntityColumnsToDisplay
 * picking up the data cellse from serverData
 * @param {*} rightEntityColumnsToDisplay
 * @param {*} serverData
 * @returns
 */
export function deliverSelectList(rightEntityColumnsToDisplay, serverData) {
  if (serverData === null) {
    return [];
  }
  if (serverData === undefined) {
    return [];
  }

  let model = serverData.metaData.model;
  let codeTableItems = serverData.metaData.codeTableItems;
  let sourceData = serverData.result.list;

  let tableContent = [];
  let rowContent = [];
  var arrayLength = sourceData.length;
  var fieldAmount = rightEntityColumnsToDisplay.length;
  for (var i = 0; i < arrayLength; i++) {
    //loop over entries from serverData
    let object = sourceData[i];
    rowContent.push(object._id);
    let picklistFieldVals = object.xRelPicklistFieldVals;

    for (var j = 0; j < fieldAmount; j++) {
      //loop over columns to display
      let fieldName = rightEntityColumnsToDisplay[j].code;

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

/************************************************************************************
 *  A V O I D   D O U B L E   S E L E C T I O N
 ************************************************************************************/
export function isAlreadyListed(selectedOutRelation, id, xRelObjectsOut) {
  let relationanme = selectedOutRelation.relationname;

  let i = 0;

  while (i < xRelObjectsOut.length) {
    let xRelObject = xRelObjectsOut[i];
    i++;
    let checkRn = xRelObject.relationName;
    let checkId = xRelObject.right_entity_id;
    if (checkRn === relationanme && checkId === id) {
      return true;
    }
  }

  return false;
}

export function identifyWhereClauseToReadOutRelations(
  relation,
  xRelObjectsOut
) {
  let idArray = [];
  let i = 0;
  while (i < xRelObjectsOut.length) {
    let xRelObject = xRelObjectsOut[i];
    if (xRelObject.relationName === relation.relationname) {
      idArray.push(xRelObject.right_entity_id);
    }
    i++;
  }
  if (idArray.length === 0) {
    return 'WHERE _id is null';
  }
  let sWhere = 'WHERE _id IN ( ';
  i = 0;
  while (i < idArray.length) {
    let id = idArray[i];
    if (i === 0) {
      sWhere = sWhere + "'" + id + "'";
    } else {
      sWhere = sWhere + ", '" + id + "'";
    }
    i++;
  }
  sWhere = sWhere + ')';
  return sWhere;
}

/************************************************************************************
 *  F I N D    E N T R I E S    W E I G H T
 ************************************************************************************/
export function captureEntryWeight(relation, _id, xRelObjectsOut) {
  let relationFilter = relation.relationname;
  let result = 0;

  let i = 0;
  while (i < xRelObjectsOut.length) {
    let xRelObject = xRelObjectsOut[i];

    if (xRelObject.relationName === relationFilter) {
      if (xRelObject.right_entity_id === _id) {
        result = xRelObject.weight;
      }
    }
    i++;
  }
  return result;
}
