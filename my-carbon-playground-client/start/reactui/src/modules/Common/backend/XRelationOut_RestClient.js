import { StatusCodes } from 'http-status-codes';
import * as AppConstants from './../AppConstants';

// ********************************************************************************
// * R E T R I E V E    E N T I T Y   B U S I N E S S     M O D E L
// ********************************************************************************

export async function readEntityBusinessModel(
  relation,
  functionOnOK,
  functionOnError
) {
  let restURL =
    relation.right_solution +
    relation.right_api +
    '/' +
    relation.right_entity +
    '/business/model';
  let response_FromServer = null;
  try {
    response_FromServer = await fetch(restURL, {
      method: 'GET',
      headers: { Accept: 'application/json, text/plain' },
    });
  } catch (error) {
    let errorJson = AppConstants.CONSTANTS.ERROR_FETCH_FAIL;
    let errorInfo = JSON.parse(errorJson);
    errorInfo.errorText = error.message;
    functionOnError(errorInfo);
    return;
  }

  let httpStatus = retrieveHTTPStatus(response_FromServer);

  //handle HTTP Status
  if (httpStatus === StatusCodes.OK) {
    let data = await response_FromServer.json();
    functionOnOK(data);
    return;
  }
  if (httpStatus === StatusCodes.BAD_REQUEST) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo);
    return;
  }
  if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo);
    return;
  }

  let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
  let errorInfo = JSON.parse(errorJson);
  errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
  functionOnError(errorInfo);
}

// ********************************************************************************
// * S E L E C T    A    L I S T    B Y   T Y P E    A H E A D    F I E L D
// ********************************************************************************

export async function selectPickList(
  relation,
  selectedTypeAHeadField,
  typeAHeadFieldText,
  functionOnOK,
  functionOnError
) {
  let restURL =
    relation.right_solution +
    relation.right_api +
    '/' +
    relation.right_entity +
    '/extended/xrelation/picklist';
  let response_FromServer = null;
  try {
    response_FromServer = await fetch(restURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain',
        whereClause:
          'where ' +
          selectedTypeAHeadField +
          " like '%" +
          typeAHeadFieldText +
          "%'",
      },
    });
  } catch (error) {
    let errorJson = AppConstants.CONSTANTS.ERROR_FETCH_FAIL;
    let errorInfo = JSON.parse(errorJson);
    errorInfo.errorText = error.message;
    functionOnError(errorInfo);
    return;
  }

  let httpStatus = retrieveHTTPStatus(response_FromServer);

  //handle HTTP Status
  if (httpStatus === StatusCodes.OK) {
    let data = await response_FromServer.json();
    functionOnOK(data);
    return;
  }
  if (httpStatus === StatusCodes.BAD_REQUEST) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo);
    return;
  }
  if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo);
    return;
  }

  let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
  let errorInfo = JSON.parse(errorJson);
  errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
  functionOnError(errorInfo);
}

export async function selectRelationList(
  relation,
  whereClause,
  functionOnOK,
  functionOnError
) {
  let restURL =
    relation.right_solution +
    relation.right_api +
    '/' +
    relation.right_entity +
    '/extended/xrelation/picklist';
  let response_FromServer = null;
  try {
    response_FromServer = await fetch(restURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain',
        whereClause: whereClause,
      },
    });
  } catch (error) {
    let errorJson = AppConstants.CONSTANTS.ERROR_FETCH_FAIL;
    let errorInfo = JSON.parse(errorJson);
    errorInfo.errorText = error.message;
    functionOnError(errorInfo, relation);
    return;
  }

  let httpStatus = retrieveHTTPStatus(response_FromServer);

  //handle HTTP Status
  if (httpStatus === StatusCodes.OK) {
    let data = await response_FromServer.json();
    functionOnOK(data, relation);
    return;
  }
  if (httpStatus === StatusCodes.BAD_REQUEST) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo, relation);
    return;
  }
  if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
    let errorInfo = await response_FromServer.json();
    functionOnError(errorInfo, relation);
    return;
  }

  let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
  let errorInfo = JSON.parse(errorJson);
  errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
  functionOnError(errorInfo, relation);
}

// ** -----------------------------------------------------------------------------
// *     Internal Helper Functions
// ** -----------------------------------------------------------------------------

function retrieveHTTPStatus(responseFromServer) {
  let httpStatus = StatusCodes.OK;
  if (!responseFromServer.ok) {
    httpStatus = responseFromServer.status;
  }
  return httpStatus;
}
