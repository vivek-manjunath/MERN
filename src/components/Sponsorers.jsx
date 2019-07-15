import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

export default class Sponsorers extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <div className="row align-items-center">
              <div class="col">
                <h4 class="card-header-title">{this.props.title}</h4>
              </div>
            </div>
          </div>
          <div className="card-body" />
        </div>
      </div>
    );
  }
}
