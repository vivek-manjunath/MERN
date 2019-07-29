/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import BatsmanInfo from './BatsmanInfo';
import Extras from './Extras';
import BattingCard from './BattingCard';

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
        winningTeamId: {},
        scorecardId: {
          teamA: {battingScorecard: []},
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
          matchData: {
            ...prevState.matchData,
            homeTeamId: res.data.homeTeamId,
            awayTeamId: res.data.awayTeamId,
            scorecardId: res.data.scorecardId,
          },
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
    API.updateMatch(this.props.match.params.matchId, this.state.matchData).then(
      res => {
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
      },
    );
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

  addBatsman = batsmanInfo => {
    // var scorecard = {teamA: {battingScorecard: []}};
    // scorecard.teamA.teamId = this.state.matchData.homeTeamId._id;
    // scorecard.teamA.battingScorecard.push(batsmanInfo);

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
                battingScorecard: [
                  ...prevState.matchData.scorecardId.teamA.battingScorecard,
                  batsmanInfo,
                ],
              },
            },
          },
        };
      },
      () => {
        API.updateScorecard(
          this.state.matchData.scorecardId._id,
          this.state.matchData.scorecardId,
        ).then(res => {
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
        API.updateScorecard(
          this.state.matchData.scorecardId._id,
          this.state.matchData.scorecardId,
        ).then(res => {
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
                          <strong>
                            {this.state.matchData.awayTeamId.name}
                          </strong>
                          <span>&nbsp;vs&nbsp;</span>
                          <strong>
                            {this.state.matchData.homeTeamId.name}
                          </strong>
                        </label>
                      </div>
                    </div>

                    <fieldset class="form-group">
                      <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0">
                          Toss won by
                        </legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="option1"
                            />
                            <label class="form-check-label" for="gridRadios1">
                              {this.state.matchData.awayTeamId.name}
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios2"
                              value="option2"
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
                        <legend class="col-form-label col-sm-4 pt-0">
                          Decision
                        </legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="tossDecision"
                              id="gridRadioBat"
                              value="bat"
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
                            />
                            <label
                              class="form-check-label"
                              for="gridRadiosBowl">
                              Bowl
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset class="form-group">
                      <div class="row">
                        <legend class="col-form-label col-sm-4 pt-0">
                          Winning team
                        </legend>
                        <div class="col-sm-8">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="winningTeamId"
                              id="gridWinningTeamAway"
                              value={this.state.matchData.awayTeamId._id}
                              checked={
                                this.state.matchData.awayTeamId._id ===
                                this.state.matchData.winningTeamId._id
                              }
                              onChange={this.handleChange}
                            />
                            <label
                              class="form-check-label"
                              for="gridWinningTeamAway">
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
                              checked={
                                // this.state.matchData.homeTeamId._id ===
                                // this.state.matchData.winningTeamId._id
                                1 == 2
                              }
                              onChange={this.handleChange}
                            />
                            <label
                              class="form-check-label"
                              for="gridWinningTeamHome">
                              {this.state.matchData.homeTeamId.name}
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <div
                      style={teamTotalContainer}
                      className="bg-dark text-white border-radius-5px">
                      <div class="form-group row">
                        <label for="lblMatch" class="col-sm-4 col-form-label">
                          <strong>
                            {this.state.matchData.awayTeamId.name}
                          </strong>
                        </label>
                        <div class="col-sm-8">
                          <label id="lblMatch" className="col-form-label">
                            <strong>
                              {this.state.matchData.scorecardId.teamA.teamTotal}
                            </strong>
                          </label>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="lblMatch" class="col-sm-4 col-form-label">
                          <strong>
                            {this.state.matchData.homeTeamId.name}
                          </strong>
                        </label>
                        <div class="col-sm-8">
                          <label id="lblMatch" className="col-form-label">
                            <strong>
                              {this.state.matchData.scorecardId.teamA.teamTotal}
                            </strong>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-center">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-8">
          <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example">
            <Tab eventKey="firstInning" title="First Inning">
              <div className="row mb-2">
                <div className="col-2">
                  <BatsmanInfo
                    addBatsmanClickHandler={this.addBatsman}
                    awayTeamPlayersLookup={
                      this.state.lookupData.awayTeamPlayers
                    }
                    homeTeamPlayersLookup={
                      this.state.lookupData.homeTeamPlayers
                    }
                  />
                </div>
                <div className="col-2">
                  {this.state.matchData.scorecardId.teamA.extras ? (
                    <Extras
                      addExtrasClickHanlder={this.addExtras}
                      extraData={this.state.matchData.scorecardId.teamA.extras}
                    />
                  ) : (
                    <h6>Loading...</h6>
                  )}
                </div>
              </div>
              {this.state.matchData && this.state.matchData.scorecardId ? (
                <BattingCard
                  scoreCardData={this.state.matchData.scorecardId.teamA}
                />
              ) : (
                'Scorecard not available'
              )}
            </Tab>
            <Tab eventKey="secondInning" title="Secong Inning">
              {/* <Sonnet /> */}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
