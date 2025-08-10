'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import * as Linking from './../Common/Linking';
import i18n from './../../singletons/i18n/I18n';
class ExplainPackageDownloadLink extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
    };
  }


calculateFileLink() {
    let result =
      Linking.getRestServiceUrl() + 'Explain/Package/Deliver/' + this.props.packageId;
    return result;
  }

  render() {


    let link = this.calculateFileLink('');
    return (
      <>
      <a
        href={link} 
        style={{
          fontSize: "80%",
        }}
      >
        {i18n.t('Example.Package.Download.link')}
      </a>
      </>
    );
  }
}

export default ExplainPackageDownloadLink;
