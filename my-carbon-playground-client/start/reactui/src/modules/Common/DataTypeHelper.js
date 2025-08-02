import i18n from './../../singletons/i18n/I18n';

export const CONSTANTS = {
  //****************************************
  // Currently handled Data Types
  // also those, which might not need support
  //****************************************

  DATA_TYPE_STRING: 1,
  DATA_TYPE_CODE: 2,
  DATA_TYPE_NUMBER: 3,
  DATA_TYPE_BOOLEAN: 4,
  DATA_TYPE_DATE: 5,
  DATA_TYPE_GYEARMONTH: 6,
  DATA_TYPE_GYEAR: 7,
  DATA_TYPE_GMONTHDAY: 8,
  DATA_TYPE_GMONTH: 9,
  DATA_TYPE_GDAY: 10,
  DATA_TYPE_TIME: 11, //currently errorprone (might be due to react-datepicker)
  DATA_TYPE_DATETIME: 12, //currently errorprone (might be due to react-datepicker)
  //  DATA_TYPE_FOREIGNKEY : 13,
  //  DATA_TYPE_TAG : 14,
  //  DATA_TYPE_ATTACHMENT : 15,
  //  DATA_TYPE_RTE : 16,
  //  DATA_TYPE_BLOBTEXT : 17,
};

//*********************************************************************************/
//* DATATYPE 2: codetable                                                         */
//*********************************************************************************/

/* ------------------------------------------------------------------------------ *
/* Support for Variables of type codetable with cardinality > 1 
/* which are soemthing like a CeckBox Group
/* ------------------------------------------------------------------------------ *


/**
 * A Variable of type codetable with cardinality > 1 is something like a CeckBox Group
 * The correspnding state variable is a stateString holding the entries as 
 * comma separated list: [Code1],[Code2],[Code3]
 * 
 * This method toggles the occurance of a code by adding
 * or removing the code to/from the stateString
 * @param {*} stateString 
 * @param {*} code 
 * @returns 
 */
export function toggleCheckBox(stateString, code) {
  //if stateString is null or undefined, then use empty string as default
  let workString = stateString;
  if (stateString === null) {
    workString = '';
  }
  if (stateString === undefined) {
    workString = '';
  }

  let codeArray = [];
  if (workString !== '') {
    codeArray = workString.split(',');
  }

  let codeIndex = codeArray.indexOf(code);
  if (codeIndex === -1) {
    //toggle means: if code is not available, then add it
    const newValue = [code];
    codeArray = codeArray.concat(newValue);
  } else {
    //toggle means: if code is available, then remove it
    let arrayBeforeCodeIndex = codeArray.slice(0, codeIndex);
    let arrayBeyondCodeIndex = codeArray.slice(codeIndex + 1);
    codeArray = arrayBeforeCodeIndex.concat(arrayBeyondCodeIndex);
  }
  let codeArrayString = codeArray.toString();
  return codeArrayString;
}

/**
 * A Variable of type codetable with cardinality > 1 is something like a CeckBox Group
 * The correspnding state variable is a stateString holding the entries as
 * comma separated list: [Code1],[Code2],[Code3]
 *
 * This method delivers the default for a CheckBox as boolean value
 *
 * If code is in stateString then the result is true
 * If code is NOT in stateString then the result is false
 * @param {*} stateString
 * @param {*} code
 * @returns
 */
export function checkBoxSelected(stateString, code) {
  if (stateString === null) {
    return false;
  }
  if (stateString === undefined) {
    return false;
  }
  let codeArray = [];
  if (stateString !== '') {
    codeArray = stateString.split(',');
  }

  var arrayLength = codeArray.length;
  for (var i = 0; i < arrayLength; i++) {
    let entry = codeArray[i];
    if (entry === code) {
      return true;
    }
  }
  return false;
}

//*********************************************************************************/
//* DATATYPE 5: date                                                                 */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: Date
 *  -  to: normalized String representation YYYY-MM-DD
 *
 * @param {*} date (from DatePicker)
 * @returns normalized String representation YYYY-MM-DD or empty string (if date is undefined, null, or '')
 */

export function transformDateToNormalizedString(date) {
  if (date === undefined) {
    return null;
  }
  if (date === null) {
    return null;
  }
  if (date === '') {
    return null;
  }

  var MM = date.getMonth() + 1; // getMonth() is zero-based
  var DD = date.getDate();
  var YYYY = date.getFullYear();

  var sMM = MM.toString();
  var sDD = DD.toString();
  var sYYYY = YYYY.toString();

  if (sMM.length === 1) {
    sMM = '0' + sMM;
  }
  if (sDD.length === 1) {
    sDD = '0' + sDD;
  }

  let result = sYYYY + '-' + sMM + '-' + sDD;

  return result;
}

/**
 * This method transforms
 *  - from: normalized String representation YYYY-MM-DD
 *  -   to: Date
 * @param {*} normalizedString
 * @returns date (derived from normalized String)
 *          OR current Date (if normalizedString = undefined, null or '')
 * @throws error if conversion fails
 */

export function transformNormalizedStringToDate(normalizedString) {
  if (normalizedString === undefined) {
    return '';
  }
  if (normalizedString === null) {
    return '';
  }
  if (normalizedString === '') {
    return '';
  }

  try {
    var sYYYY = normalizedString.substring(0, 4);
    var sMM = normalizedString.substring(5, 7);
    var sDD = normalizedString.substring(8, 10);
    var shh = '00';
    var smm = '00';
    var sss = '00';
    var isoString =
      sYYYY + '-' + sMM + '-' + sDD + 'T' + shh + ':' + smm + ':' + sss; //'1997-07-16T19:20:15'
    let result = Date.parse(isoString);
    return result;
  } catch (error) {
    throw error;
  }
}

//*********************************************************************************/
//* DATATYPE 6 : gYearMonth                                                       */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: Date
 *  - to:   normalized String representation YYYY-MM
 *
 * @param {*} date (from DatePicker)
 * @returns normalized String representation YYYY-MM or empty string (if date is undefined, null, or '')
 */
export function transformGYearMonthToNormalizedString(date) {
  if (date === undefined) {
    return null;
  }
  if (date === null) {
    return null;
  }
  if (date === '') {
    return null;
  }

  var MM = date.getMonth() + 1; // getMonth() is zero-based
  var YYYY = date.getFullYear();

  var sMM = MM.toString();
  var sYYYY = YYYY.toString();

  if (sMM.length === 1) {
    sMM = '0' + sMM;
  }
  if (sYYYY.length === 1) {
    sYYYY = '000' + sYYYY;
  }
  if (sYYYY.length === 2) {
    sYYYY = '00' + sYYYY;
  }
  if (sYYYY.length === 3) {
    sYYYY = '0' + sYYYY;
  }

  let result = sYYYY + '-' + sMM;
  return result;
}

/**
 * This method transforms
 *  - from: normalized String representation YYYY-MM
 *  -   to: Date
 *
 * @param {*} normalizedString
 * @returns date (derived from normalized String)
 *          OR current Date (if normalizedString = undefined, null or '')
 * @throws error if conversion fails
 */
export function transformNormalizedStringToGYearMonth(normalizedString) {
  if (normalizedString === undefined) {
    return '';
  }
  if (normalizedString === null) {
    return '';
  }
  if (normalizedString === '') {
    return '';
  }

  try {
    var sYYYY = normalizedString.substring(0, 4);
    var sMM = normalizedString.substring(5, 7);
    var sDD = '01';
    var shh = '00';
    var smm = '00';
    var sss = '00';
    var isoString =
      sYYYY + '-' + sMM + '-' + sDD + 'T' + shh + ':' + smm + ':' + sss; //'1997-07-16T19:20:15'
    let result = Date.parse(isoString);
    return result;
  } catch (error) {
    throw error;
  }
}

//*********************************************************************************/
//* DATATYPE 7 : gYear                                                            */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: Date
 *  - to:   normalized String representation YYYY
 *
 * @param {*} date (from DatePicker)
 * @returns normalized String representation YYYY or empty string (if date is undefined, null)
 */
export function transformGYearToNormalizedString(date) {
  if (date === undefined) {
    return null;
  }
  if (date === null) {
    return null;
  }
  if (date === '') {
    return null;
  }

  var YYYY = date.getFullYear();

  var sYYYY = YYYY.toString();

  if (sYYYY.length === 1) {
    sYYYY = '000' + sYYYY;
  }
  if (sYYYY.length === 2) {
    sYYYY = '00' + sYYYY;
  }
  if (sYYYY.length === 3) {
    sYYYY = '0' + sYYYY;
  }

  let result = sYYYY;
  return result;
}

/**
 * This method transforms
 *  - from: normalized String representation YYYY
 *  -   to: Date
 *
 * @param {*} normalizedString
 * @returns date (derived from normalized String)
 *          OR current Date (if normalizedString = undefined, null or '')
 * @throws error if conversion fails
 */
export function transformNormalizedStringToGYear(normalizedString) {
  if (normalizedString === undefined) {
    return '';
  }
  if (normalizedString === null) {
    return '';
  }
  if (normalizedString === '') {
    return '';
  }

  try {
    var sYYYY = normalizedString.substring(0, 4);
    var sMM = '01';
    var sDD = '01';
    var shh = '00';
    var smm = '00';
    var sss = '00';
    var isoString =
      sYYYY + '-' + sMM + '-' + sDD + 'T' + shh + ':' + smm + ':' + sss; //'1997-07-16T19:20:15'
    let result = Date.parse(isoString);
    return result;
  } catch (error) {
    return '';
  }
}

//*********************************************************************************/
//* DATATYPE 8 : gMonthDay                                                        */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: input-format
 *  - to:   normalized String representation MM-DD
 * @param {*} input
 * @returns null, if entered value is not valid
 */
export function transformGMonthDayToNormalizedString(input) {
  if (input === undefined) {
    return null;
  }
  if (input === null) {
    return null;
  }
  if (input === '') {
    return null;
  }

  const { formattedValue } = input;

  if (input.value === '') {
    return null;
  }

  let sDD = formattedValue.substring(0, 2);
  let sMM = formattedValue.substring(3, 5);

  let restValue = sMM + '-' + sDD;
  let result = restValue;
  return result;
}

/**
 * This method transforms
 *  - from: normalized String representation MM-DD
 *  - to:   input-format
 * @param {*} input
 */
export function transformNormalizedStringToGMonthDay(input) {
  if (input === undefined) {
    return '';
  }
  if (input === null) {
    return '';
  }
  if (input === '') {
    return '';
  }

  try {
    let sMM = input.substring(0, 2);
    let sDD = input.substring(3, 5);

    let inputFormattedValue = sDD + '/' + sMM;

    return inputFormattedValue;
  } catch (error) {
    throw error;
  }
}

export function experimentalValidation(sMM, sDD) {
  let indDDNumeric = doesStringContainsOnlyNumbericCharacters(sDD);
  if (indDDNumeric) {
    var nDD = Number(sDD);
    if (nDD < 1 || nDD > 31) {
      return null;
    }
  }

  let indMMNumeric = doesStringContainsOnlyNumbericCharacters(sMM);
  if (indDDNumeric && indMMNumeric) {
    var nDD = Number(sDD);
    var nMM = Number(sMM);

    if (nDD < 1 || nDD > 31) {
      return null;
    } //month values do only allow values <= 12
    if (nMM < 1 || nMM > 12) {
      return null;
    } //month values do only allow values <= 12

    //months with day limit 1..31
    if (
      nMM === 1 ||
      nMM === 3 ||
      nMM === 5 ||
      nMM === 7 ||
      nMM === 8 ||
      nMM === 10 ||
      nMM === 12
    ) {
      if (nDD < 1 || nDD > 31) {
        return null;
      }
    }

    //months with day limit 1..30
    if (nMM === 4 || nMM === 6 || nMM === 9 || nMM === 11) {
      if (nDD < 1 || nDD > 30) {
        return null;
      } //month values do only allow values <= 12
    }

    //months with day limit 1..29
    if (nMM === 2) {
      if (nDD < 1 || nDD > 29) {
        return null;
      }
    }
  }
}

//*********************************************************************************/
//* DATATYPE 9 : gMonth                                                        */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: input-format
 *  - to:   normalized String representation MM
 * @param {*} input
 * @returns null, if entered value is not valid
 */
export function transformGMonthToNormalizedString(input) {
  console.log(input);

  if (input === undefined) {
    return null;
  }
  if (input === null) {
    return null;
  }
  if (input === '') {
    return null;
  }

  let s = input.value;
  if (s.length === 1) {
    s = '0' + s;
  }
  return s;
}

/**
 * This method transforms
 *  - from: normalized String representation MM
 *  - to:   input-format
 * @param {*} input
 */
export function transformNormalizedStringToGMonth(input) {
  console.log(input);

  if (input === undefined) {
    return '';
  }
  if (input === null) {
    return '';
  }
  if (input === '') {
    return '';
  }

  let s = input;
  let val = parseInt(s);
  return val;
}

//*********************************************************************************/
//* DATATYPE 10 : gDay                                                        */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: input-format
 *  - to:   normalized String representation MM
 * @param {*} input
 * @returns null, if entered value is not valid
 */
export function transformGDayToNormalizedString(input) {
  if (input === undefined) {
    return null;
  }
  if (input === null) {
    return null;
  }
  if (input === '') {
    return null;
  }

  let s = input.value;
  if (s.length === 1) {
    s = '0' + s;
  }
  return s;
}

/**
 * This method transforms
 *  - from: normalized String representation MM
 *  - to:   input-format
 * @param {*} input
 */
export function transformNormalizedStringToGDay(input) {
  if (input === undefined) {
    return '';
  }
  if (input === null) {
    return '';
  }
  if (input === '') {
    return '';
  }

  let s = input;
  let val = parseInt(s);
  return val;
}

//*********************************************************************************/
//* DATATYPE 11 : time                                                            */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: Date
 *  - to:   normalized String representation hh:mm:ss
 *
 * @param {*} time (from DatePicker)
 * @returns normalized String representation hh:mm:ss or empty string (if date is undefined, null)
 */
export function transformTimeToNormalizedString(time) {
  if (time === undefined) {
    return null;
  }
  if (time === null) {
    return null;
  }
  var hh = time.getHours();
  var mm = time.getMinutes();
  var ss = time.getSeconds();

  var shh = hh.toString();
  var smm = mm.toString();
  var sss = ss.toString();

  if (shh.length === 1) {
    shh = '0' + shh;
  }
  if (smm.length === 1) {
    smm = '0' + smm;
  }
  if (sss.length === 1) {
    sss = '0' + sss;
  }

  let result = shh + ':' + smm + ':' + sss;
  return result;
}

/**
 *  - from: normalized String representation hh:mm:ss
 *  -   to: Date
 *
 * @param {*} normalizedString
 * @returns date (derived from normalized String)
 *          OR current Date (if normalizedString = undefined, null or '')
 * @throws error if conversion fails
 */
export function transformNormalizedStringToTime(normalizedString) {
  if (normalizedString === undefined) {
    return new Date();
  }
  if (normalizedString === null) {
    return new Date();
  }
  if (normalizedString === '') {
    return new Date();
  }
  try {
    var sYYYY = '2000';
    var sMM = '01';
    var sDD = '01';
    var shh = normalizedString.substring(0, 2);
    var smm = normalizedString.substring(3, 5);
    var sss = normalizedString.substring(6, 8);
    var isoString =
      sYYYY + '-' + sMM + '-' + sDD + 'T' + shh + ':' + smm + ':' + sss; //'1997-07-16T19:20:15'
    let result = Date.parse(isoString);
    return result;
  } catch (error) {
    throw error;
  }
}

//*********************************************************************************/
//* DATATYPE 12 : dateTime                                                        */
//*********************************************************************************/

/**
 * This method transforms
 *  - from: Date
 *  - to:   normalized String representation: YYYY-MM-DD_hh:mm:ss
 *
 * @param {*} dateTime (from DatePicker)
 * @returns normalized String representation YYYY or empty string (if date is undefined, null)
 */
export function transformDateTimeToNormalizedString(dateTime) {
  if (dateTime === undefined) {
    return null;
  }
  if (dateTime === null) {
    return null;
  }
  var MM = dateTime.getMonth() + 1; // getMonth() is zero-based
  var DD = dateTime.getDate();
  var YYYY = dateTime.getFullYear();
  var hh = dateTime.getHours();
  var mm = dateTime.getMinutes();
  var ss = dateTime.getSeconds();

  var sMM = MM.toString();
  var sDD = DD.toString();
  var sYYYY = YYYY.toString();
  var shh = hh.toString();
  var smm = mm.toString();
  var sss = ss.toString();

  if (sMM.length === 1) {
    sMM = '0' + sMM;
  }
  if (sDD.length === 1) {
    sDD = '0' + sDD;
  }
  if (shh.length === 1) {
    shh = '0' + shh;
  }
  if (smm.length === 1) {
    smm = '0' + smm;
  }
  if (sss.length === 1) {
    sss = '0' + sss;
  }

  let result =
    sYYYY + '-' + sMM + '-' + sDD + '_' + shh + ':' + smm + ':' + sss;
  return result;
}

/**
 *  - from: normalized String representation YYYY-MM-DD_hh:mm:ss
 *  -   to: Date
 *
 * @param {*} normalizedString
 * @returns date (derived from normalized String)
 *          OR current Date (if normalizedString = undefined, null or '')
 * @throws error if conversion fails
 */
export function transformNormalizedStringToDateTime(normalizedString) {
  if (normalizedString === undefined) {
    return new Date();
  }
  if (normalizedString === null) {
    return new Date();
  }
  if (normalizedString === '') {
    return new Date();
  }

  try {
    var sYYYY = normalizedString.substring(0, 4);
    var sMM = normalizedString.substring(5, 7);
    var sDD = normalizedString.substring(8, 10);
    var shh = normalizedString.substring(11, 13);
    var smm = normalizedString.substring(14, 16);
    var sss = normalizedString.substring(17, 19);
    var isoString =
      sYYYY + '-' + sMM + '-' + sDD + 'T' + shh + ':' + smm + ':' + sss; //'1997-07-16T19:20:15'
    let result = Date.parse(isoString);
    return result;
  } catch (error) {
    throw error;
  }
}

//*********************************************************************************/
//* DATATYPE N : name                                                             */
//*********************************************************************************/

//*********************************************************************************/
//* This method transforms                                                        */
//*  - from: Date                                                                 */
//*  - to:   normalized String representation YYYY-MM                             */
//*********************************************************************************/

//  export function transform() {
//  }

//*********************************************************************************/
//* Helpfer Functions for Date Default Values                                     */
//*********************************************************************************/

/**
 * This function delivers today's Year Component as YYYY
 */
export function getTodayYYYY() {
  let today = new Date();
  var YYYY = today.getFullYear();
  var sYYYY = YYYY.toString();
  if (sYYYY.length === 1) {
    sYYYY = '000' + sYYYY;
  }
  if (sYYYY.length === 2) {
    sYYYY = '00' + sYYYY;
  }
  if (sYYYY.length === 3) {
    sYYYY = '0' + sYYYY;
  }
  return sYYYY;
}

/**
 * This function delivers today's Day Component as DD
 */
export function getTodayDD() {
  let today = new Date();
  var NN = today.getMonth() + 1;
  var sNN = NN.toString();
  if (sNN.length === 1) {
    sNN = '0' + sNN;
  }
  return sNN;
}

/**
 * This function delivers today's Month Component as MM
 */
export function getTodayMM() {
  let today = new Date();
  var NN = today.getDay();
  var sNN = NN.toString();
  if (sNN.length === 1) {
    sNN = '0' + sNN;
  }
  return sNN;
}

//*********************************************************************************/
//* Internal Helpfer Functions                                                    */
//*********************************************************************************/

/**
 * Thius method checks, if a string does ONLY comtains numbers
 * @param {*} str
 * @returns true, if all characters are digits
 */
function doesStringContainsOnlyNumbericCharacters(str) {
  let indResult = true;
  for (let i = 0; i < str.length; i++) {
    let sChar = str[i];
    let indCharIsNotANumber = isNaN(sChar);
    if (indCharIsNotANumber) {
      return false;
    }
  }
  return true;
}

/**
 * This method delivers (based on the selected language) the dateformat
 * @param {*} dataType numeric value: 5 = date, 6 = gYearMonth, ...
 * @returns format strings - e.g. date-in-german = 'dd.MM.yyyy' , date-in-english = 'MM/dd/yyyy'
 *          if combination of datataype and language coold nourt be found, this method delivers null to the calling code
 */
export function getGregorianDateFormat(dataType) {
  let uiLanguage = i18n.getLocaleInUse();

  if (uiLanguage === 'en') {
    if (dataType === 5) {
      return 'MM/dd/yyyy';
    }
    if (dataType === 6) {
      return 'MM/yyyy';
    }
  }
  if (uiLanguage === 'de') {
    if (dataType === 5) {
      return 'dd.MM.yyyy';
    }
    if (dataType === 6) {
      return 'MM/yyyy';
    }
  }

  return null;
}
