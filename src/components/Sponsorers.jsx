import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class Sponsorers extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            {this.props.title}
          </div>
          <div className="card-body" />
        </div>
      </div>
    );
  }
}
