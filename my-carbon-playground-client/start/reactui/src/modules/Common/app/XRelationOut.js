'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Slider,
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
import { Query, Delete, Link } from '@carbon/react/icons';
import { MdScale } from 'react-icons/md';
import {
  IoChevronUpCircle,
  IoCaretDown,
  IoCaretForward,
} from 'react-icons/io5';
import * as RelationOutRestClient from './../backend/XRelationOut_RestClient';
import * as RelationOutTools from './../backend/XRelationOut_Tools';
import ErrorDisplay from './ErrorDisplay';
import * as XRelationI18nLabels from './XRelationI18nLabels';

class XRelationOut extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),

      selectionAreaIsOpen: false,
      slider: {
        defaultValue: 50,
        currentValue: 50,
      },
    };
  }

  // * ------------------------------------------------------------------------------
  // * Handle Relation Candidate Reading
  // * ------------------------------------------------------------------------------

  functionOnReadRelationCandidateOK(data) {
    const { functionOnReadRelationCandidateOK } = this.props;
    functionOnReadRelationCandidateOK(data);
  }

  functionOnReadRelationCandidateError(error) {
    const { functionOnReadRelationCandidateError } = this.props;
    functionOnReadRelationCandidateError(error);
  }

  // * ------------------------------------------------------------------------------
  // * Handle Relation Candidate Add
  // * ------------------------------------------------------------------------------
  async functionAddRelationCandidateToEntity(id) {
    //id of selected right entity

    const { relation, functionAddRelationCandidateToEntity } = this.props;
    const { slider } = this.state;

    let xRelOutHasWeight = false;
    if (relation !== null && relation !== undefined) {
      let check = relation.hasWeight;
      if (check !== null && check != undefined) {
        xRelOutHasWeight = check;
      }
    }
    let weight = 0;
    if (xRelOutHasWeight) {
      if (slider !== null && slider !== undefined) {
        let check = slider.currentValue;
        if (check !== null && check != undefined) {
          weight = check;
        }
      }
    }
    functionAddRelationCandidateToEntity(id, weight);
  }
  // * ------------------------------------------------------------------------------
  // * TypeAHead Handling Functions
  // * ------------------------------------------------------------------------------
  async functionHandleDropDownTypeAHeadSelectionFunction(event) {
    const { functionHandleDropDownTypeAHeadSelectionFunction } = this.props;
    await functionHandleDropDownTypeAHeadSelectionFunction(event);
  }

  async functionHandleTypeAHeadSelectionTextFieldChange(event) {
    const { functionHandleTypeAHeadSelectionTextFieldChange } = this.props;
    await functionHandleTypeAHeadSelectionTextFieldChange(event);
  }

  // * ------------------------------------------------------------------------------
  // * Visibility of Selection Area
  // * ------------------------------------------------------------------------------

  functionToggleVisibilityOfSelectionArea() {
    let indCurrent = this.state.selectionAreaIsOpen;
    if (indCurrent === false) {
      this.setState({ selectionAreaIsOpen: true });
    } else {
      this.setState({ selectionAreaIsOpen: false });
    }
  }

  // * ------------------------------------------------------------------------------
  // * Handle Slider Change
  // * ------------------------------------------------------------------------------
  async handleSliderInput(e) {
    this.setState({ slider: { ...this.state.slider, currentValue: e.value } });
  }

  // * ------------------------------------------------------------------------------
  // * R E N D E R
  // * ------------------------------------------------------------------------------

  render() {
    const {
      relData,
      relation,
      relationsEditable,
      xRelObjectsOut,
      functionRemoveRelationCandidateFromEntity,
    } = this.props;
    const { xRelOutRelation } = this.props;
    const { slider, selectionAreaIsOpen } = this.state;
    const {
      rightEntityBusinessModel,
      rightEntityColumnsToDisplay,
      rightEntitySearchFields,
      selectedTypeAHeadField,
      selectData,
      error,
    } = this.props.xRelOutRelation;
    let displaySelectData = null;
    let displayRelatnData = null;
    if (rightEntityColumnsToDisplay !== null) {
      displaySelectData = RelationOutTools.deliverSelectList(
        rightEntityColumnsToDisplay,
        selectData
      );
      displayRelatnData = RelationOutTools.deliverSelectList(
        rightEntityColumnsToDisplay,
        relData
      );
    }
    let indInitial = rightEntityBusinessModel === null && error === null;
    let indErrorIndicated = error !== null;
    let showSelectionArea = selectionAreaIsOpen === true;
    let iconSize = 16;

    let displayTypeAHeadText = '';
    if (xRelOutRelation !== null && xRelOutRelation !== undefined) {
      let check = xRelOutRelation.typeAHeadFieldText;
      if (check !== null && check != undefined) {
        displayTypeAHeadText = check;
      }
    }

    let showXRelOutHasWeight = false;
    if (relation !== null && relation !== undefined) {
      let check = relation.hasWeight;
      if (check !== null && check != undefined) {
        showXRelOutHasWeight = check;
      }
    }

    let letSliderValueInTable = 50;
    if (slider !== null && slider !== undefined) {
      let check = slider.currentValue;
      if (check !== null && check != undefined) {
        letSliderValueInTable = check;
      }
    }

    let fRefARCTE = this.functionAddRelationCandidateToEntity.bind(this);
    let fRefRRCFE = functionRemoveRelationCandidateFromEntity;

    if (rightEntityColumnsToDisplay === null) {
      return <div>&nbsp;</div>;
    }

    if (indInitial) {
      return (
        <div>
          <h6>Outgoing</h6>
          <Loading />
        </div>
      );
    }

    if (indErrorIndicated) {
      return (
        <div>
          <h3>List of mediaentry</h3>

          <ErrorDisplay errorInfo={error} />
        </div>
      );
    }

    let dropdown_selectedTypeAHeadField_items = rightEntitySearchFields;
    let dropdown_selectedTypeAHeadField_default_item =
      RelationOutTools.get_ListTypeAHeadSelectableItems_ItemForCode(
        rightEntityBusinessModel,
        selectedTypeAHeadField
      );

    return (
      <div>
        <FormLabel>
          {XRelationI18nLabels.getRelationLabel(relation.relationname, 'out')}
        </FormLabel>
        <Table aria-label="sample table">
          <TableHead>
            <TableRow>
              {showXRelOutHasWeight ? (
                <TableCell>
                  <MdScale size={iconSize} />
                </TableCell>
              ) : (
                <></>
              )}
              {rightEntityColumnsToDisplay.map(function (dataEntry) {
                return <TableCell>{dataEntry.text}</TableCell>;
              })}
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRelatnData.map(function (rowAsArrayOfCells) {
              return (
                <TableRow>
                  {rowAsArrayOfCells.map(function (cellText, index) {
                    if (index == 0 && showXRelOutHasWeight) {
                      return (
                        <TableCell>
                          {RelationOutTools.captureEntryWeight(
                            relation,
                            cellText,
                            xRelObjectsOut
                          )}
                        </TableCell>
                      );
                    } else {
                      return <></>;
                    }
                  })}

                  {rowAsArrayOfCells.map(function (cellText, index) {
                    if (index > 0) {
                      return <TableCell>{cellText}</TableCell>;
                    }
                  })}

                  {rowAsArrayOfCells.map(function (cellText, index) {
                    if (index === 0) {
                      return (
                        <TableCell>
                          {relationsEditable ? (
                            <Delete
                              size={20}
                              onClick={() => {
                                fRefRRCFE(relation, cellText);
                              }}
                            />
                          ) : (
                            <div>&nbsp;</div>
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        &nbsp;
        <br />
        {relationsEditable && showSelectionArea ? (
          <div>
            &nbsp;
            <br />
            <div
              onClick={this.functionToggleVisibilityOfSelectionArea.bind(this)}
            >
              <Query size={iconSize} />
              &nbsp;
              <IoCaretDown size={iconSize} />
            </div>
            &nbsp;
            <br />
            &nbsp;
            <br />
            <h6>Search & Select</h6>
            &nbsp;
            <br />
            <Dropdown
              id="xrelation.out.dropdown.typeahead.selection"
              selectedItem={dropdown_selectedTypeAHeadField_default_item}
              titleText=""
              label="..."
              items={dropdown_selectedTypeAHeadField_items}
              itemToString={(item) => (item ? item.text : '')}
              onChange={this.functionHandleDropDownTypeAHeadSelectionFunction.bind(
                this
              )}
            />
            <TextInput
              size="lg"
              value={displayTypeAHeadText}
              id="xrelation.out.dropdown.typeahead.text"
              onChange={this.functionHandleTypeAHeadSelectionTextFieldChange.bind(
                this
              )}
            />
            &nbsp;
            <br />
            <Table aria-label="sample table">
              <TableHead>
                <TableRow>
                  {rightEntityColumnsToDisplay.map(function (dataEntry) {
                    return <TableCell>{dataEntry.text}</TableCell>;
                  })}
                  <TableCell>&nbsp;</TableCell>
                  {showXRelOutHasWeight ? <TableCell>&nbsp;</TableCell> : <></>}
                </TableRow>
              </TableHead>
              <TableBody>
                {displaySelectData.map(function (rowAsArrayOfCells) {
                  return (
                    <TableRow>
                      {rowAsArrayOfCells.map(function (cellText, index) {
                        if (index > 0) {
                          return <TableCell>{cellText}</TableCell>;
                        }
                      })}

                      {showXRelOutHasWeight ? (
                        <TableCell>&nbsp;{letSliderValueInTable}</TableCell>
                      ) : (
                        <></>
                      )}

                      {rowAsArrayOfCells.map(function (cellText, index) {
                        if (index === 0) {
                          let isAlreadyListed =
                            RelationOutTools.isAlreadyListed(
                              relation,
                              cellText,
                              xRelObjectsOut
                            );
                          if (isAlreadyListed) {
                            return <TableCell>&nbsp;</TableCell>;
                          } else {
                            return (
                              <TableCell>
                                <Link
                                  size={20}
                                  onClick={() => {
                                    fRefARCTE(cellText);
                                  }}
                                />
                              </TableCell>
                            );
                          }
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            &nbsp;
            <br />
            {showXRelOutHasWeight ? (
              <div>
                &nbsp;
                <br />
                <MdScale size={iconSize} />
                <Slider
                  id="top_slider"
                  ariaLabelInput="Lower bound"
                  invalidText="Invalid message goes here"
                  labelText=""
                  max={100}
                  min={1}
                  step={1}
                  stepMultiplier={1}
                  unstable_ariaLabelInputUpper="Upper bound"
                  value={slider.defaultValue}
                  warnText="Warning message goes here"
                  hideTextInput={true}
                  onChange={this.handleSliderInput.bind(this)}
                />
                &nbsp;
                <br />
                &nbsp;
                <br />
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {relationsEditable && showSelectionArea === false ? (
          <div>
            &nbsp;
            <br />
            <div
              onClick={this.functionToggleVisibilityOfSelectionArea.bind(this)}
            >
              <Query size={iconSize} />
              &nbsp;
              <IoCaretForward size={iconSize} />
            </div>
            &nbsp;
            <br />
            &nbsp;
            <br />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default XRelationOut;
