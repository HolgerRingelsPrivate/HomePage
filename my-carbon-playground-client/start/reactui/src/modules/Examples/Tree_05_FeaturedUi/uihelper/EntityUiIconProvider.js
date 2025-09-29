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
'use client';

import React, { Component } from 'react';

import { Unknown, Folder } from "@carbon/icons-react";

import { v4 as uuidv4 } from 'uuid';

import * as CT_carbonplay_VertexTypes from './../../../Common/codetable/carbonplay/CT_carbonplay_VertexTypes';

class EntityUiIconProvider extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  
  render() {

    const { node } = this.props;

    switch (node.payload.vertexType) {

      case CT_carbonplay_VertexTypes.CODE.JS_NORMAL:

        if (node.children.length !== 0) {
          return (
            <>
              <Folder style={{ marginLeft: "4px" }} />
            </>
          );
        } else {
          return (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          );
        }
        break;


      case CT_carbonplay_VertexTypes.CODE.JS_TAXONOMY:

        if (node.children.length !== 0) {
          return (
            <>
              <Folder style={{ marginLeft: "4px" }} />
            </>
          );
        } else {
          return (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </>
          );
        }
        break;

      default:
          return (
            <>
              <Unknown style={{ marginLeft: "4px" }} />
            </>
          );

    }


  }



}
export default EntityUiIconProvider;
