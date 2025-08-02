import i18n from './../../../singletons/i18n/I18n';

// ********************************************************************************
// * D E L I V E R    C O L U M N S   T O   D I S P L A Y
// ********************************************************************************

export function deliverColumnsToDisplay(attribs, labels) {
  var result = [];
  let uiLang = i18n.getLocaleInUse();

  //Loop over attributes
  let i = 0;
  while (i < attribs.length) {
    let attrib = attribs[i];
    let visibleColumn = false;
    visibleColumn =
      visibleColumn || (attrib.dataTypeID === 1 && attrib.cardinality === '1');
    visibleColumn =
      visibleColumn || (attrib.dataTypeID === 2 && attrib.cardinality === '1');
    if (visibleColumn) {
      //Loop over i18n
      let j = 0;
      let i18n = '?';
      while (j < labels.length) {
        let label = labels[j];
        let indKeyFound = label.code === '$L1_' + attrib.field;
        let indLangFound = label.language === uiLang;
        if (indKeyFound && indLangFound) {
          i18n = label.value;
        }
        j++;
      }

      let columnToDisplay = {
        code: attrib.field,
        text: i18n,
      };

      result.push(columnToDisplay);
    }
    i++;
  }

  return result;
}

export function getFieldValueToDisplay(
  fieldName,
  fieldValue,
  model,
  codeTableItems
) {
  //identify attribute by fieldname
  let attributes = model.entityAttributes;
  var arrayLength = attributes.length;
  let identifiedEntityAttribute = null;
  for (var i = 0; i < arrayLength; i++) {
    //loop over model's entity attributes
    let entityAttribCandidate = attributes[i];
    if (entityAttribCandidate.field === fieldName) {
      identifiedEntityAttribute = entityAttribCandidate;
    }
  }
  if (identifiedEntityAttribute === null) {
    return '?unknown field?';
  }

  //identifiy datatype and cardinality
  //and translate fieldValue according to datatype
  let datatype = identifiedEntityAttribute.dataTypeID;
  let cardinality = identifiedEntityAttribute.cardinality;
  if (datatype === 1) {
    //String
    return fieldValue;
  }
  if (datatype === 2) {
    //Codetable
    let codeTableID = identifiedEntityAttribute.codeConstrainCodeTableID;
    if (cardinality !== '1') {
      return '...';
    } else {
      let result = identifyCodetableVisibleValue(
        codeTableID,
        codeTableItems,
        fieldValue
      );
      return result;
    }
  }

  return '???';
}

function identifyCodetableVisibleValue(codeTableID, codeTableItems, code) {
  let uiLang = i18n.getLocaleInUse();

  var arrayLength = codeTableItems.length;
  for (var i = 0; i < arrayLength; i++) {
    //loop over codetableitems
    let codeTableItemCandidate = codeTableItems[i];
    let match = true;
    match = match && codeTableItemCandidate.codeTableId === codeTableID;
    match = match && codeTableItemCandidate.language === uiLang;
    match = match && codeTableItemCandidate.code === code;
    if (match) {
      return codeTableItemCandidate.value;
    }
  }
  return code;
}
