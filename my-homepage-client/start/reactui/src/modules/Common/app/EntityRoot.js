'use client';

import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EntityNavigation from './EntityNavigation';

import EntityDisplayNotSelected from './EntityDisplayNotSelected';
import EntityDisplaySelected from './EntityDisplaySelected';

class EntityRoot extends Component {
  constructor(props) {
    super(props);

    // Create the state
    this.state = {
      id: this.constructor.name + ' ' + uuidv4(),
      entityToDisplay: null,
    };
  }

  functionDisplayEntity(entityToDisplay) {
    this.setState({
      entityToDisplay: entityToDisplay,
    });
  }

  render() {
    const { entityToDisplay } = this.state;
    let indNoEntitySelected = entityToDisplay === null;

    return (
      <div>
        <table width="100%">
       	  <tbody>
          <tr>
            <td width="22%" valign="top">
              <EntityNavigation
                functionDisplayEntity={this.functionDisplayEntity.bind(this)}
              />
            </td>
            <td width="2%" valign="top">
              &nbsp;
            </td>
            <td width="76%" valign="top">
              {indNoEntitySelected ? (
                <div>
                  &nbsp;
                  <br />
                  <EntityDisplayNotSelected />
                </div>
              ) : (
                <div>
                  &nbsp;
                  <br />
                  <EntityDisplaySelected entityToDisplay={entityToDisplay} />
                </div>
              )}
              &nbsp;
              <br />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default EntityRoot;
