'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button, Loading } from '@carbon/react';
import { Grid, Column } from '@carbon/react';
import { IoCaretDown, IoCaretForward } from 'react-icons/io5';
import { ChartRelationship } from '@carbon/react/icons';
import XRelationOut from './XRelationOut';
import XRelationIn from './XRelationIn';
import * as XRelationOut_Tools from './../backend/XRelationOut_Tools';
import * as XRelationInRestClient from './../backend/XRelationIn_RestClient';
import * as XRelationI18nLabels from './XRelationI18nLabels';

class XRelationRoot extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),

      relationsAreOpen: false,
      selectedOutRelation: null,
      selectedInRelation: null,

      xRelInRelation: {
        displayData: null,
        error: null,
      },
    };
  }

  // * ------------------------------------------------------------------------------
  // * Handle Read X Relation (InRelation) read results
  // * ------------------------------------------------------------------------------

  async functionOnReadWhereClauseOK(relation, response) {
    //  let relation = this.state.selectedInRelation;
    let whereClause = response.message;
    await XRelationInRestClient.readDataToDisplay(
      relation,
      whereClause,
      this.functionOnReadDisplayDataOK.bind(this),
      this.functionOnReadDisplayDataError.bind(this)
    );
  }

  async functionOnReadWhereClauseError(relation, error) {
    this.setState({
      xRelInRelation: {
        ...this.state.xRelInRelation,
        displayData: null,
        error: error,
      },
      selectedInRelation: relation,
      selectedOutRelation: null,
    });
  }

  async functionOnReadDisplayDataOK(relation, response) {
    this.setState({
      xRelInRelation: {
        ...this.state.xRelInRelation,
        displayData: response,
        error: null,
      },
      selectedInRelation: relation,
      selectedOutRelation: null,
    });
  }

  async functionOnReadDisplayDataError(relation, error) {
    this.setState({
      xRelInRelation: {
        ...this.state.xRelInRelation,
        displayData: null,
        error: error,
      },
      selectedInRelation: relation,
      selectedOutRelation: null,
    });
  }

  // * ------------------------------------------------------------------------------
  // * functions to handle relation selection
  // * ------------------------------------------------------------------------------

  async functionSelectOutRel(relation) {
    const { functionXRelationRootSetOutRelation } = this.props;
    this.setState({
      selectedOutRelation: relation,
      selectedInRelation: null,
    });
    functionXRelationRootSetOutRelation(relation);
  }

  async functionSelectInRel(relation) {
    const { idOfObjectToShow } = this.props;
    XRelationInRestClient.readInpoinitingIDs(
      relation,
      idOfObjectToShow,
      this.functionOnReadWhereClauseOK.bind(this),
      this.functionOnReadWhereClauseError.bind(this)
    );
  }

  // * ------------------------------------------------------------------------------
  // * function to controll visibility of relation user interface
  // * ------------------------------------------------------------------------------

  functionToggleVisibilityOfRelUi() {
    let indCurrent = this.state.relationsAreOpen;
    if (indCurrent === false) {
      this.setState({ relationsAreOpen: true });
    } else {
      this.setState({ relationsAreOpen: false });
    }
  }

  // * ------------------------------------------------------------------------------
  // * function to add en entity to entity's out relation list
  // * ------------------------------------------------------------------------------

  functionAddRelationCandidateToEntity(id, weight) {
    //id of selected right entity
    const { selectedOutRelation } = this.state;
    const { xRelObjectsOut, functionAddRelationCandidateToEntity } = this.props;
    let isAlreadyListed = XRelationOut_Tools.isAlreadyListed(
      selectedOutRelation,
      id,
      xRelObjectsOut
    );
    if (isAlreadyListed === false) {
      functionAddRelationCandidateToEntity(selectedOutRelation, id, weight);
    }
  }

  render() {
    const { relationsEditable, idOfObjectToShow, xreldata, relData } =
      this.props;
    const {
      functionRemoveRelationCandidateFromEntity,
      functionHandleDropDownTypeAHeadSelectionFunction,
    } = this.props;
    const {
      functionOnReadRelationCandidateOK,
      functionOnReadRelationCandidateError,
      functionHandleTypeAHeadSelectionTextFieldChange,
    } = this.props;
    const pointIns = xreldata.pointIns;
    const pointOuts = xreldata.pointOuts;
    const { xRelInRelation } = this.state;
    const { relationsAreOpen, selectedOutRelation, selectedInRelation } =
      this.state;

    let iconSize = 16;
    let showOpen = relationsAreOpen === true;
    let fRefOutRelSelect = this.functionSelectOutRel.bind(this);
    let fRefInRelSelect = this.functionSelectInRel.bind(this);
    if (showOpen) {
      return (
        <div>
          &nbsp;
          <br />
          <div onClick={this.functionToggleVisibilityOfRelUi.bind(this)}>
            <ChartRelationship size={iconSize} />
            &nbsp;
            <IoCaretDown size={iconSize} />
          </div>
          &nbsp;
          <br />
          &nbsp;
          <br />
          {pointOuts.map(function (relation) {
            return (
              <Button
                kind="ghost"
                onClick={() => {
                  fRefOutRelSelect(relation);
                }}
                size="sm"
              >
                {XRelationI18nLabels.getRelationLabel(
                  relation.relationname,
                  'out'
                )}
              </Button>
            );
          })}
          {pointIns.map(function (relation) {
            return (
              <Button
                kind="ghost"
                onClick={() => {
                  fRefInRelSelect(relation);
                }}
                size="sm"
              >
                {XRelationI18nLabels.getRelationLabel(
                  relation.relationname,
                  'in'
                )}
              </Button>
            );
          })}
          &nbsp;
          <br />
          &nbsp;
          <br />
          {selectedOutRelation !== null ? (
            <div>
              <XRelationOut
                idOfObject={idOfObjectToShow}
                relation={selectedOutRelation}
                relationsEditable={relationsEditable}
                functionAddRelationCandidateToEntity={this.functionAddRelationCandidateToEntity.bind(
                  this
                )}
                functionRemoveRelationCandidateFromEntity={
                  functionRemoveRelationCandidateFromEntity
                }
                functionHandleDropDownTypeAHeadSelectionFunction={
                  functionHandleDropDownTypeAHeadSelectionFunction
                }
                functionOnReadRelationCandidateOK={
                  functionOnReadRelationCandidateOK
                }
                functionOnReadRelationCandidateError={
                  functionOnReadRelationCandidateError
                }
                functionHandleTypeAHeadSelectionTextFieldChange={
                  functionHandleTypeAHeadSelectionTextFieldChange
                }
                xRelObjectsOut={this.props.xRelObjectsOut}
                relData={relData}
                xRelOutRelation={this.props.xRelOutRelation}
              />
            </div>
          ) : (
            <></>
          )}
          {selectedInRelation !== null ? (
            <div>
              <XRelationIn
                idOfObject={idOfObjectToShow}
                mode={this.props.mode}
                relation={selectedInRelation}
                xRelInRelation={this.state.xRelInRelation}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    } else {
      return (
        <div>
          &nbsp;
          <br />
          <div onClick={this.functionToggleVisibilityOfRelUi.bind(this)}>
            <ChartRelationship size={iconSize} />
            &nbsp;
            <IoCaretForward size={iconSize} />
          </div>
          &nbsp;
          <br />
          &nbsp;
          <br />
        </div>
      );
    }
  }
}

export default XRelationRoot;
