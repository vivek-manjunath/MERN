/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import {Tabs, Tab, Form, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import BatsmanInfo from './BatsmanInfo';
import Extras from './Extras';

export default class AddScorecard extends Component {
  constructor() {
    super();
    this.state = {
      matchData: {
        homeTeamId: {},
        awayTeamId: {},
        scorecardId: {teamA: {battingScorecard: []}, isActive: true},
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
              ...prevState,
              homeTeamPlayers: res.data,
            },
          };
        });
      });

      API.getPlayersByTeam(res.data.awayTeamId._id).then(res => {
        this.setState(prevState => {
          return {
            lookupData: {
              ...prevState,
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

    this.setState(prevState => {
      return {
        matchData: {...prevState.matchData, [name]: value},
      };
    });
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card bg-light border-radius-5px">
                <div className="card-body">
                  <div class="form-group row">
                    <label for="lblMatch" class="col-sm-2 col-form-label">
                      Match
                    </label>
                    <div class="col-sm-10">
                      <label id="lblMatch">
                        <strong>{this.state.matchData.awayTeamId.name}</strong>
                        <span>&nbsp;vs&nbsp;</span>
                        <strong>{this.state.matchData.homeTeamId.name}</strong>
                      </label>
                    </div>
                  </div>
                  <fieldset class="form-group">
                    <div class="row">
                      <legend class="col-form-label col-sm-2 pt-0">
                        Toss won by
                      </legend>
                      <div class="col-sm-10">
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
                      <legend class="col-form-label col-sm-2 pt-0">
                        Decision
                      </legend>
                      <div class="col-sm-10">
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
                          <label class="form-check-label" for="gridRadiosBowl">
                            Bowl
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="form-group">
                    <div class="row">
                      <legend class="col-form-label col-sm-2 pt-0">
                        Winning team
                      </legend>
                      <div class="col-sm-10">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="winningTeamId"
                            id="gridWinningTeamAway"
                            value={this.state.matchData.awayTeamId._id}
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
        <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example">
          <Tab eventKey="firstInning" title="First Inning">
            <div className="row mb-2">
              <div className="col-2">
                {/* <h5>Batting</h5> */}
                <BatsmanInfo
                  addBatsmanClickHandler={this.addBatsman}
                  playersLookup={this.state.lookupData.awayTeamPlayers}
                />
              </div>
              <div className="col-2">
                <Extras />
              </div>
            </div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Batsman</th>
                  <th scope="col">R</th>
                  <th scope="col">B</th>
                  <th scope="col">4s</th>
                  <th scope="col">6s</th>
                  <th scope="col">SR</th>
                </tr>
              </thead>
              <tbody>
                {this.state.matchData && this.state.matchData.scorecardId
                  ? this.state.matchData.scorecardId.teamA.battingScorecard.map(
                      item => {
                        return (
                          <tr>
                            <td>{item.playerId.firstName}</td>
                            <td>{item.runs}</td>
                            <td>{item.balls}</td>
                            <td>{item.numberOfFours}</td>
                            <td>{item.numberOfSixes}</td>
                            <td>{item.strikeRate}</td>
                          </tr>
                        );
                      },
                    )
                  : 'Scorecard not available'}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="secondInning" title="Secong Inning">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
      </div>
    );
  }
}
