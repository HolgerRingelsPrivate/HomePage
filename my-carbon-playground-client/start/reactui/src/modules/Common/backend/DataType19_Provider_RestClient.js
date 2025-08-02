import * as AppConstants from "./../AppConstants";
import * as Linking from "./../Linking";
import { StatusCodes } from 'http-status-codes';

const CONSTANTS = {
	ENDPOINT : '/data/provider/for/field'
}


// ********************************************************************************
// * C A P T U R E    D A T A   F O R   D A T A T Y P E     1 9
// ********************************************************************************
/**
 * This method retrieves data for datatype 19
 * @returns a key val -list ( or an empty list, if data could not be retrieved for any reason)
 */
export async function captureKeyValList(entity, field) {


	let restURL = Linking.getRestServiceUrl() + "/" + entity + CONSTANTS.ENDPOINT + '/' + field;
	
	let response_FromServer = null;
	try {
		response_FromServer = await fetch(restURL, {
			method: 'GET',
			headers: { 'Accept': 'application/json, text/plain' }
		   });
	} catch (error) {
		let errorJson = AppConstants.CONSTANTS.ERROR_FETCH_FAIL;
		let errorInfo = JSON.parse(errorJson); 
		errorInfo.errorText = error.message;
		return resultObjectContainingErrorInfo(errorInfo);
	}
	   
	let httpStatus = retrieveHTTPStatus(response_FromServer)

	//handle HTTP Status is 2xx (OK)
	if (httpStatus >= 200 && httpStatus < 300) {
		let data = await response_FromServer.json();
		try {
			let list = data.list;
			return resultObjectContainingData(list);
		} catch (error) {
			let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
			let errorInfo = JSON.parse(errorJson); 
			errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
			return resultObjectContainingErrorInfo(errorInfo);
		}
	}  

	let errorJson = AppConstants.CONSTANTS.ERROR_UNKNOWN;
	let errorInfo = JSON.parse(errorJson); 
	errorInfo.errorText = 'Caused by HTTP-Status ' + httpStatus;
	return resultObjectContainingErrorInfo(errorInfo);


}

// ** -----------------------------------------------------------------------------
// *     Internal Helper Functions
// ** -----------------------------------------------------------------------------

function resultObjectContainingErrorInfo(errorInfo) {
	let objResult = {};
	objResult.errorInfo = errorInfo;
	objResult.list = null;
	return objResult;
}

function resultObjectContainingData(list) {
	let objResult = {};
	objResult.errorInfo = null;
	objResult.list = list;
	return objResult;
}


function retrieveHTTPStatus(responseFromServer) {
	let httpStatus = StatusCodes.OK;
	if (!responseFromServer.ok) {
		httpStatus = responseFromServer.status;
	}
	return httpStatus;
}
