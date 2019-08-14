/** @format */

import React, {Component} from 'react';
import BattingCard from './BattingCard';
import BowlingCard from './BowlingCard';
import API from '../../utils/API';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

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
      showBlockUi: true,
    };
  }

  componentDidMount() {
    API.getScorecard(this.props.match.params.scorecardId).then(res => {
      this.setState({scorecardData: res.data, showBlockUi: false});
    });
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.showBlockUi}>
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
                {this.state.scorecardData.firstInning && this.state.scorecardData.firstInning.bowlingScorecard.bowlerList && (
                  <BowlingCard scoreCardData={this.state.scorecardData.firstInning.bowlingScorecard.bowlerList} />
                )}
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
                {this.state.scorecardData.secondInning && this.state.scorecardData.secondInning.bowlingScorecard.bowlerList && (
                  <BowlingCard scoreCardData={this.state.scorecardData.secondInning.bowlingScorecard.bowlerList} />
                )}
              </div>
            </div>
          </div>
        </div>
      </BlockUi>
    );
  }
}
