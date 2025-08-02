'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  FormItem,
  FileUploaderDropContainer,
  Button,
  InlineLoading,
} from '@carbon/react';
import {
  Upload,
  DocumentAttachment,
  DocumentAdd,
  ChangeCatalog,
} from '@carbon/react/icons';
import * as FileUpload_RestClient from './../backend/FileUpload_RestClient';

class GenericFileUploader extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      droppedFiles: [], //list of dropped file(s)
      fileName: '',
      showFileActions: false, //whe this flag is set, further file handling actions are visualized
    };
  }

  render() {
    const { defaultBoxText } = this.props; //String to be displayed in the upload box
    const { fileName, showFileActions } = this.state;

    let boxtext = defaultBoxText;

    let visibleFileName = fileName;
    if (visibleFileName === undefined) {
      visibleFileName = '';
    }
    if (visibleFileName === null) {
      visibleFileName = '';
    }
    if (visibleFileName !== '') {
      boxtext = visibleFileName;
    }

    return (
      <div>
        <table width="100%">
          <tr>
            <td width="5%">
              &nbsp;&nbsp;
              <ChangeCatalog />
              &nbsp;:&nbsp;
            </td>
            <td width="35%">
              <FormItem>
                <FileUploaderDropContainer
                  innerRef={{
                    current: '[Circular]',
                  }}
                  labelText={boxtext}
                  justify-content="center"
                  name=""
                  onAddFiles={(e) => {
                    let type = e.type;
                    let files = null;
                    if (type === 'drop') {
                      files = e.dataTransfer.files;
                    } else {
                      files = e.target.files;
                    }
                    this.onDrop(files);
                  }}
                  onChange={function noRefCheck() {}}
                />
              </FormItem>
            </td>
            <td width="50%">
              {showFileActions === true ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Upload
                    size={20}
                    onClick={this.fileSubmit.bind(
                      this,
                      this.state.droppedFiles
                    )}
                  />
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                  &nbsp;
                  <br />
                </>
              ) : (
                <></>
              )}
              &nbsp;
            </td>
          </tr>
        </table>
      </div>
    );
  }

  // ********************************************************************************
  // * onDrop called, when a file has been dropped to Drop Container
  // ********************************************************************************
  onDrop = (droppedFiles) => {
    if (droppedFiles.length !== 1) {
      this.setState({
        droppedFiles: [],
        fileName: '',
        showFileActions: false,
      });
      return;
    }

    this.setState({
      droppedFiles: droppedFiles,
      fileName: droppedFiles[0].name,
      showFileActions: true,
    });
  };

  // ********************************************************************************
  // * doFileSubmit is called based on Button Action
  // ********************************************************************************

  async functionOnFileSubmitOk(data) {
    const { callBackFunctionOnFileSubmitOk } = this.props;
    callBackFunctionOnFileSubmitOk(data);
  }
  async functionOnFileSubmitError(error) {
    console.log('');
  }

  async fileSubmit(droppedFiles) {
    const { commonEndPoint } = this.props;
    let callBackOK = this.functionOnFileSubmitOk.bind(this);
    let callBackError = this.functionOnFileSubmitError.bind(this);

    FileUpload_RestClient.submitOneFile(
      commonEndPoint,
      droppedFiles,
      callBackOK,
      callBackError
    );
  }
} //end class

export default GenericFileUploader;
