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

import React from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@carbon/react';

import i18n from './../../../../singletons/i18n/I18n';


const NodeModalInfo = ({ open, setOpen, node }) => {

  let nodeid = '';
  try {
    nodeid = node.id;
  } catch (error) {
    nodeid = ''
  }

  let nodelabel = '';
  try {
    nodelabel = node.label;
  } catch (error) {
    nodelabel = ''
  }

  let payloadLabel = '';
  try {
    payloadLabel = node.payload.name;
  } catch (error) {
    payloadLabel = ''
  }
  
  let payloadid = '';
  try {
    payloadid = node.payload.id;
  } catch (error) {
    payloadid = ''
  }
  let vertexType = "";
  try {
      vertexType = node.payload.vertexType;
  } catch (error) {
      vertexType = "";
  }
  

  
//  if node 
  return (
    <ComposedModal size="small" open={open} onClose={() => setOpen(false)} >
      <ModalHeader
        title={
          i18n.t('ModalProfileEntityInfo.heading.prefix') + " : " + nodelabel
        }
        closeModal={() => setOpen(false)}
      />
      <ModalBody>
        <div>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    nodeid
                  </TableCell>
                  <TableCell>
                    {nodeid}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                  vertexType
                  </TableCell>
                  <TableCell>
                    {vertexType}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    payload.id
                  </TableCell>
                  <TableCell>
                    {payloadid}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    payload.name
                  </TableCell>
                  <TableCell>
                    {payloadLabel}
                  </TableCell>
                </TableRow>

              </TableBody>
            </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Button kind="primary" onClick={() => setOpen(false)}>
            {i18n.t('ApplicationHeader.ModalInfo.closeButton')}
          </Button>
        </div>
      </ModalFooter>
    </ComposedModal>
  );
};

export default NodeModalInfo;
