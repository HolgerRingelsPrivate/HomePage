'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as CT_ADD_Examples from './../../Common/codetable/carbonplay/CT_ADD_Examples';

import { FormLabel, TableContainer, Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '@carbon/react';

class Introduction extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    return (
      <div>
          <FormLabel>
            {CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE)}
          </FormLabel>
          &nbsp;<br/><br/>
          ...<br/>
          &nbsp;<br/>
          <TableContainer>
            <Table aria-label="sample table" size="compact">
              <TableBody>
                <TableRow>
                  <TableCell>
                    {CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
                  </TableCell>
                  <TableCell>
                    ...
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
                  </TableCell>
                  <TableCell>
                    ...
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    {CT_ADD_Examples.getTextForCode(CT_ADD_Examples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
                  </TableCell>
                  <TableCell>
                    ...
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


      </div>
    );
  }
}

export default Introduction;
