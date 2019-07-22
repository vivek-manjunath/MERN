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
      },
      battingScorecard: [
        {
          batsman: '',
        },
      ],
    };
  }

  componentDidMount() {
    API.getMatch(this.props.match.params.matchId).then(res => {
      this.setState({matchData: res.data});
    });
  }

  addBatsman = e => {
    e.preventDefault();
    let newBatsMan = {};
    this.setState({
      battingScorecard: [...this.state.battingScorecard, newBatsMan],
    });
  };
  render() {
    return (
      <form>
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
            <legend class="col-form-label col-sm-2 pt-0">Toss won by</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  checked
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
            <legend class="col-form-label col-sm-2 pt-0">Decision</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadiosDecision"
                  id="gridRadioBat"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="gridRadioBat">
                  Bat
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadiosDecision"
                  id="gridRadiosBowl"
                  value="option2"
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
            <legend class="col-form-label col-sm-2 pt-0">Winning team</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridResult"
                  id="gridWinningTeamAway"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="gridWinningTeamAway">
                  {this.state.matchData.awayTeamId.name}
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridResult"
                  id="gridWinningTeamHome"
                  value="option2"
                />
                <label class="form-check-label" for="gridWinningTeamHome">
                  {this.state.matchData.homeTeamId.name}
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example">
          <Tab eventKey="firstInning" title="First Inning">
            <div className="row mb-2">
              <div className="col-lg-12">
                <h5>Batting</h5>
                <BatsmanInfo />
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
                {this.state.battingScorecard.map(item => {
                  return (
                    <tr>
                      <td>{item.batsman}</td>
                      <td>{item.dismissal}</td>
                      <td>{item.balls}</td>
                      <td>{item.fours}</td>
                      <td>{item.sixes}</td>
                      <td>{item.strikeRate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="secondInning" title="Secong Inning">
            {/* <Sonnet /> */}
          </Tab>
        </Tabs>
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
    );
  }
}
