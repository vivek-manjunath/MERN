/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import BatsmanInfo from './BatsmanInfo';
import Extras from './Extras';
import BattingCard from './BattingCard';
import BowlerInfo from './BowlerInfo';

const teamTotalContainer = {
  paddingLeft: '10px',
};

export default class AddScorecard extends Component {
  constructor() {
    super();
    this.state = {
      matchData: {
        homeTeamId: {},
        awayTeamId: {},
        winningTeamId: '',
        scorecardId: {
          firstInning: {battingScorecard: {}},
          secondInning: {battingScorecard: {}},
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
      API.getPlayersByTeam(res.data.homeTeamId._id).then(res => {
        this.setState(prevState => {
          return {
            lookupData: {
              ...prevState.lookupData,
              homeTeamPlayers: res.data,
            },
          };
        });
      });

      API.getPlayersByTeam(res.data.awayTeamId._id).then(res => {
        this.setState(prevState => {
          return {
            lookupData: {
              ...prevState.lookupData,
              awayTeamPlayers: res.data,
            },
          };
        });
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.matchData.tossWinningTeamId === this.state.matchData.homeTeamId && this.state.matchData.tossDecision == 'bat') {
      this.state.matchData.scorecardId.firstInning.battingTeamId = this.state.matchData.homeTeamId._id;
      this.state.matchData.scorecardId.firstInning.bowlingTeamId = this.state.matchData.awayTeamId._id;

      this.state.matchData.scorecardId.secondInning.battingTeamId = this.state.matchData.awayTeamId._id;
      this.state.matchData.scorecardId.secondInning.bowlingTeamId = this.state.matchData.homeTeamId._id;
    } else {
      this.state.matchData.scorecardId.firstInning.battingTeamId = this.state.matchData.awayTeamId._id;
      this.state.matchData.scorecardId.firstInning.bowlingTeamId = this.state.matchData.homeTeamId._id;

      this.state.matchData.scorecardId.secondInning.battingTeamId = this.state.matchData.homeTeamId._id;
      this.state.matchData.scorecardId.secondInning.bowlingTeamId = this.state.matchData.awayTeamId._id;
    }

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
    });
  };

  handleChange = e => {
    const {name, value} = e.target;

    this.setState(
      prevState => {
        return {
          matchData: {...prevState.matchData, [name]: value},
        };
      },
      () => {
        console.log({...this.state});
      },
    );
  };

  // addBatsman = batsmanInfo => {
  //   this.setState(
  //     prevState => {
  //       return {
  //         ...prevState,
  //         matchData: {
  //           ...prevState.matchData,
  //           scorecardId: {
  //             ...prevState.matchData.scorecardId,
  //             firstInning: {
  //               ...prevState.matchData.scorecardId.firstInning,
  //               battingScorecard: {
  //                 ...prevState.matchData.scorecardId.firstInning
  //                   .battingScorecard,
  //                 batsmanList: [
  //                   ...prevState.matchData.scorecardId.firstInning
  //                     .battingScorecard.batsmanList,
  //                   batsmanInfo,
  //                 ],
  //               },
  //             },
  //           },
  //         },
  //       };
  //     },
  //     () => {
  //       API.updateScorecard(
  //         this.state.matchData.scorecardId._id,
  //         this.state.matchData.scorecardId,
  //       ).then(res => {
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

  addBatsman = batsmanInfo => {
    API.addBatsmanInfo(this.state.matchData.scorecardId.firstInning.battingScorecard._id, batsmanInfo).then(res => {
      console.log('Batsman added');
    });
  };

  addBowler = bowlerInfo => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          matchData: {
            ...prevState.matchData,
            scorecardId: {
              ...prevState.matchData.scorecardId,
              teamB: {
                ...prevState.matchData.scorecardId.teamB,
                bowlingScorecard: [...prevState.matchData.scorecardId.teamB.bowlingScorecard, bowlerInfo],
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
          <form onSubmit={this.handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card bg-light border-radius-5px">
                  <div className="card-body result-summary-container">
                    <div class="form-group row">
                      <label for="lblMatch" class="col-sm-4 col-form-label">
                        Match
                      </label>
                      <div class="col-sm-8">
                        <label id="lblMatch" className="col-form-label">
                          <strong>{this.state.matchData.awayTeamId.name}</strong>
                          <span>&nbsp;vs&nbsp;</span>
                          <strong>{this.state.matchData.homeTeamId.name}</strong>
                        </label>
                      </div>
                    </div>

                    <fieldset class="form-group">
                      <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0">Toss won by</legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tossWinningTeamId"
                              id="gridRadios1"
                              value={this.state.matchData.awayTeamId._id}
                              checked={this.state.matchData.awayTeamId._id == this.state.matchData.tossWinningTeamId}
                              onChange={this.handleChange}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              {this.state.matchData.awayTeamId.name}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tossWinningTeamId"
                              id="gridRadios2"
                              value={this.state.matchData.homeTeamId._id}
                              checked={this.state.matchData.homeTeamId._id == this.state.matchData.tossWinningTeamId}
                              onChange={this.handleChange}
                            />
                            <label class="form-check-label" for="gridRadios2">
                              {this.state.matchData.homeTeamId.name}
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset class="form-group">
                      <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0">Decision</legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tossDecision"
                              id="gridRadioBat"
                              value="bat"
                              onChange={this.handleChange}
                              checked={this.state.matchData.tossDecision == 'bat'}
                            />
                            <label class="form-check-label" for="gridRadioBat">
                              Bat
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tossDecision"
                              id="gridRadiosBowl"
                              value="bowl"
                              onChange={this.handleChange}
                              checked={this.state.matchData.tossDecision == 'bowl'}
                            />
                            <label class="form-check-label" for="gridRadiosBowl">
                              Bowl
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset class="form-group">
                      <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0">Winning team</legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="winningTeamId"
                              id="gridWinningTeamAway"
                              value={this.state.matchData.awayTeamId._id}
                              checked={this.state.matchData.awayTeamId._id == this.state.matchData.winningTeamId}
                              onChange={this.handleChange}
                            />
                            <label class="form-check-label" for="gridWinningTeamAway">
                              {this.state.matchData.awayTeamId.name}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="winningTeamId"
                              id="gridWinningTeamHome"
                              value={this.state.matchData.homeTeamId._id}
                              checked={this.state.matchData.homeTeamId._id == this.state.matchData.winningTeamId}
                              onChange={this.handleChange}
                            />
                            <label class="form-check-label" for="gridWinningTeamHome">
                              {this.state.matchData.homeTeamId.name}
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <div style={teamTotalContainer}>
                      <div class="form-group row">
                        <label for="lblMatch" class="col-sm-4 col-form-label">
                          <strong>{this.state.matchData.awayTeamId.name}</strong>
                        </label>
                        <div class="col-sm-4">
                          <label id="lblMatch" className="col-form-label">
                            <strong>{this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning.battingScorecard.totalRunsScored}</strong>
                          </label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="lblMatch" class="col-sm-4 col-form-label">
                          <strong>{this.state.matchData.homeTeamId.name}</strong>
                        </label>
                        <div class="col-sm-4">
                          <label id="lblMatch" className="col-form-label">
                            <strong>{this.state.matchData.scorecardId && this.state.matchData.scorecardId.secondInning.battingScorecard.totalRunsScored}</strong>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <button type="submit" className="btn btn-sm btn-success">
                      Update Match Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-8">
          <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="firstInning" title="First Inning">
              <div className="row mb-2">
                <div className="col-3">
                  <BatsmanInfo
                    addBatsmanClickHandler={this.addBatsman}
                    awayTeamPlayersLookup={this.state.lookupData.awayTeamPlayers}
                    homeTeamPlayersLookup={this.state.lookupData.homeTeamPlayers}
                  />
                </div>
                <div>
                  <BowlerInfo addBowlerClickHandler={this.addBowler} homeTeamPlayersLookup={this.state.lookupData.homeTeamPlayers} />
                </div>
                <div className="col-4">
                  {this.state.matchData.scorecardId && this.state.matchData.scorecardId.firstInning && this.state.matchData.scorecardId.firstInning.extras ? (
                    <Extras addExtrasClickHanlder={this.addExtras} extraData={this.state.matchData.scorecardId.firstInning.extras} />
                  ) : (
                    <h6>Loading...</h6>
                  )}
                </div>
              </div>
              {this.state.matchData && this.state.matchData.scorecardId ? <BattingCard scoreCardData={this.state.matchData.scorecardId.firstInning} /> : 'Scorecard not available'}
            </Tab>
            <Tab eventKey="secondInning" title="Secong Inning" />
          </Tabs>
        </div>
      </div>
    );
  }
}
