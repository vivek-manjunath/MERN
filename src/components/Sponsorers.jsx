/** @format */

import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';

export default class Sponsorers extends Component {
  render() {
    return (
      <div className="mb-3">
        <div className="card shadow">
          <div className="card-header font-weight-bold">{this.props.title}</div>
          <div className="card-body" />
        </div>
      </div>
    );
  }
}
