/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import BatsmanInfo from './BatsmanInfo';
import Extras from './Extras';
import BattingCard from './BattingCard';
import BowlingCard from './BowlingCard';
import BowlerInfo from './BowlerInfo';
import MatchSummary from './MatchSummary';
import Common from '../../utils/Common';

export default class UpdateScorecard extends Component {
  constructor() {
    super();
    this.state = {
      matchData: {
        homeTeamId: {},
        awayTeamId: {},
        winningTeamId: {},
        tossWinningTeamId: {},
        scorecardId: {
          firstInning: {battingScorecard: {}, bowlingScorecard: {}},
          secondInning: {battingScorecard: {}, bowlingScorecard: {}},
          isActive: true,
        },
      },
      lookupData: {},
    };
  }

  componentDidMount() {
    API.getMatch(this.props.match.params.matchId).then(res => {
      this.setState(prevState => {
        return {
          matchData: res.data,
        };
      });
    });
  }

  updateMatchSummary = e => {
    e.preventDefault();

    API.updateMatch(this.props.match.params.matchId, this.state.matchData).then(res => {
      console.log(res.data.scorecardId);
      this.setState(
        prevState => {
          return {
            matchData: {
              ...prevState.matchData,
              scorecardId: res.data.scorecardId,
            },
          };
        },
        () => {
          console.log(this.state.matchData);
        },
      );
      Common.alertSuccess('Match summary updated');
    });
  };

  handleChange = e => {
    const {name, value} = e.target;

    this.setState(prevState => {
      return {
        matchData: {...prevState.matchData, [name]: value},
      };
    });
  };

  addBatsman = (battingScorecardId, batsmanInfo) => {
    API.addBatsmanInfo(battingScorecardId, batsmanInfo).then(res => {
      Common.alertSuccess('Batsman added');
    });
  };
  addBowler = (bowlingScorecardId, bowlerInfo) => {
    API.addBowlerInfo(bowlingScorecardId, bowlerInfo).then(res => {
      console.log('Batsman added');
    });
  };

  // addBowler = bowlerInfo => {
  //   this.setState(
  //     prevState => {
  //       return {
  //         ...prevState,
  //         matchData: {
  //           ...prevState.matchData,
  //           scorecardId: {
  //             ...prevState.matchData.scorecardId,
  //             teamB: {
  //               ...prevState.matchData.scorecardId.teamB,
  //               bowlingScorecard: [...prevState.matchData.scorecardId.teamB.bowlingScorecard, bowlerInfo],
  //             },
  //           },
  //         },
  //       };
  //     },
  //     () => {
  //       API.updateScorecard(this.state.matchData.scorecardId._id, this.state.matchData.scorecardId).then(res => {
  //         this.setState(prevState => {
  //           return {
  //             matchData: {
  //               ...prevState.matchData,
  //               scorecardId: res.data,
  //             },
  //           };
  //         });
  //       });
  //     },
  //   );
  // };

  addExtras = extraInfo => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          matchData: {
            ...prevState.matchData,
            scorecardId: {
              ...prevState.matchData.scorecardId,
              teamA: {
                ...prevState.matchData.scorecardId.teamA,
                extras: extraInfo,
              },
            },
          },
        };
      },
      () => {
        API.updateScorecard(this.state.matchData.scorecardId._id, this.state.matchData.scorecardId).then(res => {
          this.setState(prevState => {
            return {
              matchData: {
                ...prevState.matchData,
                scorecardId: res.data,
              },
            };
          });
        });
      },
    );
  };

  addBattingScorecard = () => {
    API.addBattingScorecard(this.state.matchData.scorecardId._id).then(res => {
      console.log('Batting scorecard added');
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <MatchSummary updateMatchSummary={this.updateMatchSummary} matchData={this.state.matchData} handleChange={this.handleChange} />
        </div>
        <div className="col-8">
          <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="firstInning" title="First Inning">
              <div className="row mb-2">
                <div className="col-3">
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning && this.state.matchData.scorecardId.firstInning.battingTeamId && (
                    <BatsmanInfo
                      addBatsmanClickHandler={this.addBatsman}
                      battingTeamId={this.state.matchData.scorecardId.firstInning.battingTeamId}
                      bowlingTeamId={this.state.matchData.scorecardId.firstInning.bowlingTeamId}
                      battingScorecardId={this.state.matchData.scorecardId.firstInning.battingScorecard._id}
                    />
                  )}
                </div>
                <div className="col-4">
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning && (
                    <Extras addExtrasClickHanlder={this.addExtras} extraData={this.state.matchData.scorecardId.firstInning.extras} />
                  )}
                </div>
              </div>
              {this.state.matchData && this.state.matchData.scorecardId ? (
                <div>
                  <BattingCard scoreCardData={this.state.matchData.scorecardId.firstInning} />
                </div>
              ) : (
                'Batting scorecard not available'
              )}
              {this.state.matchData &&
                this.state.matchData.scorecardId &&
                this.state.matchData.scorecardId.firstInning &&
                this.state.matchData.scorecardId.firstInning.bowlingScorecard.bowlerList && (
                  <div>
                    {this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning && this.state.matchData.scorecardId.firstInning.bowlingTeamId && (
                      <BowlerInfo
                        addBowlerClickHandler={this.addBowler}
                        bowlingScorecardId={this.state.matchData.scorecardId.firstInning.bowlingScorecard._id}
                        bowlingTeamId={this.state.matchData.scorecardId.firstInning.bowlingTeamId}
                      />
                    )}
                    <BowlingCard scoreCardData={this.state.matchData.scorecardId.firstInning.bowlingScorecard.bowlerList} />
                  </div>
                )}
            </Tab>
            <Tab eventKey="secondInning" title="Secong Inning">
              <div className="row mb-2">
                <div className="col-3">
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.secondInning && this.state.matchData.scorecardId.secondInning.battingTeamId && (
                    <BatsmanInfo
                      addBatsmanClickHandler={this.addBatsman}
                      battingTeamId={this.state.matchData.scorecardId.secondInning.battingTeamId}
                      bowlingTeamId={this.state.matchData.scorecardId.secondInning.bowlingTeamId}
                      battingScorecardId={this.state.matchData.scorecardId.secondInning.battingScorecard._id}
                    />
                  )}
                </div>

                <div className="col-4">
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.secondInning && (
                    <Extras addExtrasClickHanlder={this.addExtras} extraData={this.state.matchData.scorecardId.secondInning.extras} />
                  )}
                </div>
              </div>
              {this.state.matchData && this.state.matchData.scorecardId ? (
                <div>
                  <BattingCard scoreCardData={this.state.matchData.scorecardId.secondInning} />
                </div>
              ) : (
                'Batting scorecard not available'
              )}
              {this.state.matchData.scorecardId && this.state.matchData.scorecardId.secondInning && this.state.matchData.scorecardId.secondInning.bowlingScorecard.bowlerList && (
                <div>
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.secondInning && this.state.matchData.scorecardId.secondInning.bowlingTeamId && (
                    <BowlerInfo
                      addBowlerClickHandler={this.addBowler}
                      bowlingScorecardId={this.state.matchData.scorecardId.secondInning.bowlingScorecard._id}
                      bowlingTeamId={this.state.matchData.scorecardId.secondInning.bowlingTeamId}
                    />
                  )}
                  <BowlingCard scoreCardData={this.state.matchData.scorecardId.secondInning.bowlingScorecard.bowlerList} />
                </div>
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
