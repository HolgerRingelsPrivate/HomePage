'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

//imports for RichText Editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    // Initialize RichText Editor
    const htmlDefault = props.defaultValue;
    let hmlInEditor = htmlDefault;
    if (hmlInEditor === null) {
      hmlInEditor = '';
    }
    if (hmlInEditor === undefined) {
      hmlInEditor = '';
    }
    const contentBlock = htmlToDraft(hmlInEditor);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorStateP = EditorState.createWithContent(contentState);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      editorState: editorStateP,
      currentHtml: '',
    };
  }

  onEditorStateChange(editorState) {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
      currentHtml: html,
    });

    let { functionHandleRichTextChange, field } = this.props;
    //    console.log("field : " + field);
    //    console.log("html : " + html);
    functionHandleRichTextChange(field, html);
  }
  render() {
    if (typeof window === 'undefined') {
      //required for next js
      return <></>;
    }

    // Capture html from master component (defaultValue)
    const { defaultValue, readOnly } = this.props;
    const { currentHtml } = this.state;
    const { editorState } = this.state;

    let htmlFromMasterComponent = defaultValue;
    if (htmlFromMasterComponent === null) {
      htmlFromMasterComponent = '';
    }
    if (htmlFromMasterComponent === undefined) {
      htmlFromMasterComponent = '';
    }

    //    console.log("htmlFromMasterComponent : " + htmlFromMasterComponent);
    //    console.log("currentHtml : " + currentHtml);

    let visibleEditorState = null;
    if (htmlFromMasterComponent !== currentHtml) {
      //      console.log("htmlFromMasterComponent OVERRULES currentHtml ");
      let contentBlock = htmlToDraft(htmlFromMasterComponent);
      let contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      visibleEditorState = EditorState.createWithContent(contentState);
    } else {
      //      console.log("current Html  is in lead");
      visibleEditorState = editorState;
    }

    if (readOnly === true) {
      return (
        <div>
          <Editor
            editorState={visibleEditorState}
            readOnly={true}
            toolbarHidden={true} // Hides the toolbar
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbarClassName="toolbarClassName"
            onEditorStateChange={this.onEditorStateChange.bind(this)}
            toolbar={{
              options: [
                'inline',
                'fontSize',
                'fontFamily',
                'list',
                'textAlign',
                'colorPicker',
                'link',
                'emoji',
              ],
              inline: { inDropdown: false },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="custom-editor">
          <Editor
            editorState={visibleEditorState}
            readOnly={false}
            toolbarHidden={false} // Hides the toolbar
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbarClassName="toolbarClassName"
            onEditorStateChange={this.onEditorStateChange.bind(this)}
            toolbar={{
              options: [
                'inline',
                'fontSize',
                'fontFamily',
                'list',
                'textAlign',
                'colorPicker',
                'link',
                'emoji',
              ],
              inline: { inDropdown: false },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
          />
        </div>
      );
    }
  }
}

export default RichTextEditor;
