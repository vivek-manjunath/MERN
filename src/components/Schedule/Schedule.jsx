/** @format */

import React, {Component} from 'react';
import Matches from '../Results/Matches';

export default class Schedule extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Matches hideScorecardCol={true} />
        </div>
      </div>
    );
  }
}
