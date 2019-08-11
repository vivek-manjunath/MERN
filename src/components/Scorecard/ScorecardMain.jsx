/** @format */

import React, {Component} from 'react';
import BattingCard from './BattingCard';
import BowlingCard from './BowlingCard';
import API from '../../utils/API';

export default class ScorecardMain extends Component {
  constructor() {
    super();
    this.state = {
      scorecardData: {
        // teamA: {
        //   teamId: {},
        //   battingScorecard: [],
        //   extras: {},
        // },
        // teamB: {
        //   teamId: {},
        //   battingScorecard: [],
        //   bowlingScorecard: [],
        //   extras: {},
        // },
        firstInning: {},
      },
    };
  }

  componentDidMount() {
    API.getScorecard(this.props.match.params.scorecardId).then(res => {
      this.setState({scorecardData: res.data}, () => {
        console.log('Parent');
        console.log(this.state);
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            {/* <BattingCard scorecardData = {this.state.battingScorecard}></BattingCard> */}
            <div>
              <div className="row">
                <div className="col-md-12">
                  <BattingCard scoreCardData={this.state.scorecardData.firstInning} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* <BowlingCard scoreCardData={this.state.scorecardData.firstInning.bowlingScorecard} /> */}
          </div>
        </div>
      </div>
    );
  }
}
