'use client';

import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Accordion, AccordionItem} from '@carbon/react';
import { Button } from "@carbon/react";

class EntityNavigation extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
		  id: this.constructor.name + ' ' + uuidv4(),
    };    
  }

  functionChangeEntityToDislay(entityToDisplay) {
    this.props.functionDisplayEntity(entityToDisplay);
  }

  render() {

    let fRef1 = this.functionChangeEntityToDislay.bind(this);


    return (
      <div>
        <br/>
        <Accordion align="start">
        </Accordion>
      </div>
    );
  }
}

export default EntityNavigation;
