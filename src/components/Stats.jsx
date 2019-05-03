import React, { Component } from "react";

export default class Stats extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action">
                Top Batsmen
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                Top Bowlers
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                Most Catches
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9" />
        </div>
      </div>
    );
  }
}
