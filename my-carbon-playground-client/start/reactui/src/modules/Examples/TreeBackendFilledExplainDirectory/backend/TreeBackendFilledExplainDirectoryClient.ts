import * as Linking from "../../../Common/Linking";
import { StatusCodes } from 'http-status-codes';

const CONSTANTS = {
    ENDPOINT: 'Example/TreeViaRecursion'
}

import type { PojoJGraphtTreeNode, PojoJGraphtTreeNodeList } from '../../../Common/types/PojoJGraphtTreeNode';

/**
 * This method delivers a tree
 * @param id can be null or a string, which identifies a particular tree (set null in this context)
 * @returns 
 */
export async function captureTree(id: string): Promise<PojoJGraphtTreeNodeList> {

    let url = Linking.getRestServiceUrl() + CONSTANTS.ENDPOINT

    let response_FromServer = null;
    try {
        response_FromServer = await fetch(url, {
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