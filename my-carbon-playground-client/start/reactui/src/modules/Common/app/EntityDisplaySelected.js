'use client';

import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';


class EntityDisplaySelected extends Component {
  constructor(props) {
    super(props);

       // Create the state
       this.state = {
          id: this.constructor.name + ' ' + uuidv4(),
        // pageToDisplay: 0,
      };
  }

  render() {

    let {entityToDisplay} = this.props;



    return (
      <div>
        <br/>
        <br/>
        <p>
        <br/>
        EntitySelectedDisplay : {entityToDisplay}
        </p>
      </div>
    );
  }
}

export default EntityDisplaySelected;
