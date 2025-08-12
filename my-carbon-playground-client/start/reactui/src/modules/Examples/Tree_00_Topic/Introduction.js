'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as CT_carbonplay_TopicsAndExamples from './../../Common/codetable/carbonplay/CT_carbonplay_TopicsAndExamples';

import { FormLabel, TableContainer, Table, TableHead, TableBody, TableHeader, TableRow, TableCell } from '@carbon/react';
import ExplainPackageDownloadLink from '@/modules/ExamplesUiHelper/ExplainPackageDownloadLink';

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
            {CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE)}
          </FormLabel>
          &nbsp;<br/><br/>
          <ExplainPackageDownloadLink
                      packageId = {CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE}
                    />
          <br/>
          &nbsp;<br/>
          <TableContainer>
            <Table aria-label="sample table" size="compact">
              <TableBody>
                <TableRow>
                  <TableCell>
                    {CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED)}
                  </TableCell>
                  <TableCell>
                    <ExplainPackageDownloadLink
                      packageId = {CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_SELF_FILLED}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    {CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY)}
                  </TableCell>
                  <TableCell>
                    <ExplainPackageDownloadLink
                      packageId = {CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_FROM_EXPLAIN_DIRECTORY}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    {CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2)}
                  </TableCell>
                  <TableCell>
                  <ExplainPackageDownloadLink
                      packageId = {CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_2}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    {CT_carbonplay_TopicsAndExamples.getTextForCode(CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1)}
                  </TableCell>
                  <TableCell>
                  <ExplainPackageDownloadLink
                      packageId = {CT_carbonplay_TopicsAndExamples.CODE.JS_EXAMPLE_TREE_BACKEND_FILLED_1}
                    />
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
