/* **************************************************************************************
 *
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2025
 * All Rights Reserved
 *
 * US Government Users Restricted Rights -Use, duplication or
 *
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 ************************************************************************************** */
import React from "react";

import NodeUiProviderContent from './NodeUiProviderContent'


export function getUserInterface(node, hrefUiUpdate) {
    return (
        <NodeUiProviderContent 
            node = {node}
            hrefUiUpdate = {hrefUiUpdate}
        />
    );
}





