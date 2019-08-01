/** @format */

import React, {Component} from 'react';

export default class Standings extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-success">
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked=""
              />{' '}
              Pool
            </label>
            <label class="btn btn-success">
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
              />{' '}
              Overall
            </label>
          </div>
        </div>
      </div>
    );
  }
}
