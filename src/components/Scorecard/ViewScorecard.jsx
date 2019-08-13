/** @format */

import React, {Component} from 'react';
import BattingCard from './BattingCard';
import BowlingCard from './BowlingCard';
import API from '../../utils/API';

export default class ViewScorecard extends Component {
  constructor() {
    super();
    this.state = {
      scorecardData: {
        firstInning: {
          battingScorecard: {},
          bowlingScorecard: {},
        },
        secondInning: {
          battingScorecard: {},
          bowlingScorecard: {},
        },
      },
    };
  }

  componentDidMount() {
    API.getScorecard(this.props.match.params.scorecardId).then(res => {
      this.setState({scorecardData: res.data});
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-md-12">
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
              {this.state.scorecardData.firstInning.bowlingScorecard.bowlerList && <BowlingCard scoreCardData={this.state.scorecardData.firstInning.bowlingScorecard.bowlerList} />}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="row">
            <div className="col-md-12">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <BattingCard scoreCardData={this.state.scorecardData.secondInning} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {this.state.scorecardData.secondInning.bowlingScorecard.bowlerList && (
                <BowlingCard scoreCardData={this.state.scorecardData.secondInning.bowlingScorecard.bowlerList} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
