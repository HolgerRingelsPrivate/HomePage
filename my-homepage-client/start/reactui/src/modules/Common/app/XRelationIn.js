'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  FormLabel,
  Dropdown,
  TextInput,
} from '@carbon/react';
import { Loading } from '@carbon/react';
import * as XRelationInRestClient from './../backend/XRelationIn_RestClient';
import * as XRelationInTools from './../backend/XRelationIn_Tools';
import ErrorDisplay from './ErrorDisplay';
import * as XRelationI18nLabels from './XRelationI18nLabels';

class XRelationIn extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }

  render() {
    const { relation, mode } = this.props;
    const { displayData, error } = this.props.xRelInRelation;

    let indInitial = displayData === null && error === null;
    let indDataAvailable = displayData !== null && error === null;
    let indErrorIndicated = displayData === null && error !== null;
    let indNoRelationDislplay = mode === 'C';

    if (indNoRelationDislplay) {
      return <></>;
    }

    if (indInitial) {
      return (
        <div>
          <h6>Incoming</h6>
          <Loading />
        </div>
      );
    }

    if (indErrorIndicated) {
      return (
        <div>
          <ErrorDisplay errorInfo={error} />
        </div>
      );
    }

    let leftEntityColumnsToDisplay = null;
    let displayShowData = null;
    if (displayData !== null) {
      leftEntityColumnsToDisplay =
        XRelationInTools.deliverColumnsToDisplay(displayData);
      displayShowData = XRelationInTools.deliverTouchedList(displayData);
      console.log();
    }

    return (
      <div>
        <FormLabel>
          {XRelationI18nLabels.getRelationLabel(relation.relationname, 'in')}
        </FormLabel>
        &nbsp;
        <br />
        <Table aria-label="sample table">
          <TableHead>
            <TableRow>
              {leftEntityColumnsToDisplay.map(function (dataEntry) {
                return <TableCell>{dataEntry.text}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {displayShowData.map(function (rowAsArrayOfCells) {
              return (
                <TableRow>
                  {rowAsArrayOfCells.map(function (cellText, index) {
                    return <TableCell>{cellText}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default XRelationIn;
