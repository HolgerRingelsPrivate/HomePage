import * as AppConstants from "./../AppConstants";
import * as Linking from "./../Linking";
import { StatusCodes } from 'http-status-codes';

const CONSTANTS = {
	ENDPOINT : 'Common/UI/params'
}


// ********************************************************************************
// * C A P T U R E    I 1 8 N
// ********************************************************************************
/**
 * This method retrieves the i18n Configuration from server
 * @returns i18n-Configuration as json string or null in case of any error
 */
export async function captureUiParams() {

	let restURL = Linking.getRestServiceUrl() + CONSTANTS.ENDPOINT
	
	let response_FromServer = null;
	try {
		response_FromServer = await fetch(restURL, {
			method: 'GET',
			headers: { 'Accept': 'application/json, text/plain' }
		   });
	} catch (error) {
		return null;
	}
	   
	let httpStatus = retrieveHTTPStatus(response_FromServer)

	//handle HTTP Status
	if (httpStatus === StatusCodes.OK) {
		let data = await response_FromServer.json();
		return data;
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
}
