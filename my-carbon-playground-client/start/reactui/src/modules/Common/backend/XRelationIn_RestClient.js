import { StatusCodes } from 'http-status-codes';
import * as AppConstants from './../AppConstants';

// ********************************************************************************
// * R E T R I E V E    L I S T   O F    I N P O I N T I N G    I D s
// ********************************************************************************

export async function readInpoinitingIDs(
  relation,
  right_entity_id,
  functionOnOK,
  functionOnError
) {
  let relationname = relation.relationname;

  let restURL =
    relation.left_solution +
    relation.left_api +
    '/Common/relations/touchlist/' +
    relationname +
    '/' +
    right_entity_id;
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
    functionOnError(relation, errorInfo);
    return;
  }

  let httpStatus = retrieveHTTPStatus(response_FromServer);

  //handle HTTP Status
  if (httpStatus === StatusCodes.OK) {
    let data = await response_FromServer.json();
    functionOnOK(relation, data);
    return;
  }
  if (httpStatus === StatusCodes.BAD_REQUEST) {
    let errorInfo = await response_FromServer.json();
    functionOnError(relation, errorInfo);
    return;
  }
  if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
    let errorInfo = await response_FromServer.json();
    functionOnError(relation, errorInfo);
    return;
  }

  let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
  let errorInfo = JSON.parse(errorJson);
  errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
  functionOnError(relation, errorInfo);
}

// ********************************************************************************
// * R E T R I E V E    D A T A   T O    D I S P L A Y
// ********************************************************************************

export async function readDataToDisplay(
  relation,
  whereClause,
  functionOnOK,
  functionOnError
) {
  let restURL =
    relation.left_solution +
    relation.left_api +
    '/' +
    relation.left_entity +
    '/extended/xrelation/touchlist';

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
    functionOnError(relation, errorInfo);
    return;
  }

  let httpStatus = retrieveHTTPStatus(response_FromServer);

  //handle HTTP Status
  if (httpStatus === StatusCodes.OK) {
    let data = await response_FromServer.json();
    functionOnOK(relation, data);
    return;
  }
  if (httpStatus === StatusCodes.BAD_REQUEST) {
    let errorInfo = await response_FromServer.json();
    functionOnError(relation, errorInfo);
    return;
  }
  if (httpStatus === StatusCodes.INTERNAL_SERVER_ERROR) {
    let errorInfo = await response_FromServer.json();
    functionOnError(relation, errorInfo);
    return;
  }

  let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
  let errorInfo = JSON.parse(errorJson);
  errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
  functionOnError(relation, errorInfo);
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
