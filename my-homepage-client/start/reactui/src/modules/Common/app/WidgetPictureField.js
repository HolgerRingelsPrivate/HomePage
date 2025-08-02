'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import GenericFileUploader from './GenericFileUploader';
import { FitToHeight, FitToWidth, Edit, EditOff } from '@carbon/react/icons';
import { TextInput } from '@carbon/react';
import * as FileUpload_RestClient from './../../Common/backend/FileUpload_RestClient';

class WidgetPictureField extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      editorIsOpen: false,
    };
  }

  // * ------------------------------------------------------------------------------
  // * function to controll visibility of editor
  // * ------------------------------------------------------------------------------

  functionToggleVisibilityOfEditUi() {
    let indCurrent = this.state.editorIsOpen;
    if (indCurrent === false) {
      this.setState({ editorIsOpen: true });
    } else {
      this.setState({ editorIsOpen: false });
    }
  }

  // ************************************************************************************************
  // OnChange Function for height or width
  // ************************************************************************************************

  functionHandleNumberFieldChange(event) {
    let widgetsFieldName = event.target.id.split('_')[1]; // = 'height' of 'width'
    let newValue = event.target.value;

    if (newValue === '') {
      return;
    }

    if (newValue !== '') {
      //empty is allowed

      //... and it MUST be only numbers
      var regExp = new RegExp('^\\d+$');
      var indValid = regExp.test(newValue);
      if (indValid === false) {
        return;
      }
    }

    const {
      field,
      functionHandlePictureChangeOfHeight,
      functionHandlePictureChangeOfWidth,
    } = this.props;
    let indValue = parseInt(newValue);

    if (widgetsFieldName === 'height') {
      functionHandlePictureChangeOfHeight(field, indValue);
    }
    if (widgetsFieldName === 'width') {
      functionHandlePictureChangeOfWidth(field, indValue);
    }
  }

  // ************************************************************************************************
  // OnChange Function for file has been uploaded ( not yet been checked vor validity)
  // ************************************************************************************************

  async functionOnFileSubmitOk(data) {
    let fileID = data.fileID;
    let {
      fileUploaderCommonEndPoint,
      field,
      functionHandlePictureChangeOfLink,
    } = this.props;
    let src = await FileUpload_RestClient.getFileDownloadUrl(
      fileUploaderCommonEndPoint,
      fileID
    );
    functionHandlePictureChangeOfLink(field, src);
  }

  // ************************************************************************************************
  // R E N D E R
  // ************************************************************************************************

  render() {
    const { mode } = this.props; //can be 'R', 'C', 'U'
    const { picture } = this.props; //Picture Object
    const { fileUploaderCommonEndPoint, fileUploaderDefaultBoxText } =
      this.props;
    const { editorIsOpen } = this.state;

    let iconSize = 18;
    let showOpen = editorIsOpen === true;

    // === if no picture has been given via props, then this default Picutre is displayed
    let defaultPicture = {
      src: '/app_images/NoImage.jpg',
      alt: '[ Image ]',
      width: 300,
      height: 200,
    };

    let pictureToDisplay = null;
    try {
      pictureToDisplay = JSON.parse(picture);
    } catch (error) {
      pictureToDisplay = defaultPicture;
    }
    //    if (picture === undefined)  {pictureToDisplay = defaultPicture }
    //    if (picture === null)       {pictureToDisplay = defaultPicture }

    let useWithHeight = true;
    if (pictureToDisplay.width === 0 || pictureToDisplay.height === 0) {
      useWithHeight = false;
    }

    if (mode === 'R') {
      return (
        <div>
          <p>
            &nbsp;
            <br />
            {useWithHeight ? (
              <img
                src={pictureToDisplay.src}
                alt="   ===> ??? <==="
                width={pictureToDisplay.width}
                height={pictureToDisplay.height}
              />
            ) : (
              <img
                src={pictureToDisplay.src}
                alt="   ===> ??? <==="
                class="thisApp_ONE_IMAGE_ResponsiveFullSize"
              />
            )}
            &nbsp;
            <br />
            <br />
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
          &nbsp;
          <br />
          {useWithHeight ? (
            <img
              src={pictureToDisplay.src}
              alt="   ===> ??? <==="
              width={pictureToDisplay.width}
              height={pictureToDisplay.height}
            />
          ) : (
            <img
              src={pictureToDisplay.src}
              alt="   ===> ??? <==="
              class="thisApp_ONE_IMAGE_ResponsiveFullSize"
            />
          )}
          {editorIsOpen ? (
            <div>
              <div onClick={this.functionToggleVisibilityOfEditUi.bind(this)}>
                &nbsp;&nbsp;
                <EditOff size={iconSize} />
              </div>
              &nbsp;
              <br />
              <table>
                <tr>
                  <td>
                    &nbsp;&nbsp;
                    <FitToWidth />
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    <TextInput
                      size="sm"
                      value={pictureToDisplay.width}
                      id="WidgetPictureField_width"
                      onChange={this.functionHandleNumberFieldChange.bind(this)}
                    />
                  </td>
                  <td>
                    &nbsp;&nbsp;
                    <FitToHeight />
                    &nbsp;:&nbsp;&nbsp;&nbsp;
                  </td>
                  <td>
                    <TextInput
                      size="sm"
                      value={pictureToDisplay.height}
                      id="WidgetPictureField_height"
                      onChange={this.functionHandleNumberFieldChange.bind(this)}
                    />
                  </td>
                </tr>
              </table>
              &nbsp;
              <br />
              <br />
              <GenericFileUploader
                commonEndPoint={fileUploaderCommonEndPoint}
                defaultBoxText={fileUploaderDefaultBoxText}
                callBackFunctionOnFileSubmitOk={this.functionOnFileSubmitOk.bind(
                  this
                )}
              />
              &nbsp;
              <br />
            </div>
          ) : (
            <div>
              <div onClick={this.functionToggleVisibilityOfEditUi.bind(this)}>
                &nbsp;&nbsp;
                <Edit size={iconSize} />
              </div>
              &nbsp;
              <br />
            </div>
          )}
        </p>
      </div>
    );
  }
}

export default WidgetPictureField;
