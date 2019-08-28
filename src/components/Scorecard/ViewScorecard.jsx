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
      // scorecardData: {
      //   firstInning: {
      //     battingScorecard: {},
      //     bowlingScorecard: {},
      //   },
      //   secondInning: {
      //     battingScorecard: {},
      //     bowlingScorecard: {},
      //   },
      // },
      matchData: {},
      showBlockUi: true,
    };
  }

  componentDidMount() {
    // API.getScorecard(this.props.match.params.scorecardId).then(res => {
    //   this.setState({scorecardData: res.data, showBlockUi: false});
    // });

    API.getMatch(this.props.match.params.matchId).then(res => {
      this.setState(prevState => {
        return {
          matchData: res.data,
          showBlockUi: false,
        };
      });
    });
  }

  render() {
    return (
      <BlockUi tag="div" blocking={this.state.showBlockUi}>
        {this.state.matchData && this.state.matchData.awayTeamId && this.state.matchData.homeTeamId && (
          <div>
            <div>
              <div className="card mb-3 border-radius-5px">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-md-12">
                      <h6>{this.state.matchData.tossWinningTeamId.name + ' won the toss and decided to ' + this.state.matchData.tossDecision}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>
                        <span className="font-weight-600">{this.state.matchData.awayTeamId.name}</span>
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h5>
                        <span className="font-weight-600">{this.state.matchData.homeTeamId.name}</span>
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h6>{this.state.matchData.winningTeamId.name + ' won'}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <BattingCard scoreCardData={this.state.matchData && this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {this.state.matchData &&
                    this.state.matchData.scorecardId &&
                    this.state.matchData.scorecardId.firstInning &&
                    this.state.matchData.scorecardId.firstInning.bowlingScorecard.bowlerList && (
                      <BowlingCard scoreCardData={this.state.matchData.scorecardId.firstInning.bowlingScorecard.bowlerList} />
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
                        {this.state.matchData && this.state.matchData.scorecardId && <BattingCard scoreCardData={this.state.matchData.scorecardId.secondInning} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {this.state.matchData &&
                    this.state.matchData.scorecardId &&
                    this.state.matchData.scorecardId.secondInning &&
                    this.state.matchData.scorecardId.secondInning.bowlingScorecard.bowlerList && (
                      <BowlingCard scoreCardData={this.state.matchData.scorecardId.secondInning.bowlingScorecard.bowlerList} />
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </BlockUi>
    );
  }
}
