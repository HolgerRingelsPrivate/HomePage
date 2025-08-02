import * as AppConstants from './../../Common/AppConstants';
import * as Linking from './../../Common/Linking';
import { StatusCodes } from 'http-status-codes';

export async function getFileDownloadUrl(commonEndPoint, fileID) {
  let restURL =
    (await Linking.getRestServiceUrl()) +
    commonEndPoint +
    '/file/download/' +
    fileID;
  return restURL;
}

export async function submitOneFile(
  commonEndPoint,
  acceptedFiles,
  functionOnOK,
  functionOnError
) {
  let restURL =
    (await Linking.getRestServiceUrl()) + commonEndPoint + '/file/upload';

  const formData = new FormData();
  for (let i = 0; i < acceptedFiles.length; i++) {
    let acceptedFile = acceptedFiles[i];
    formData.append('file_' + i.toString(), acceptedFile);
  }

  let response_FromServer = await fetch(restURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
    },
    body: formData,
  });

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
}
