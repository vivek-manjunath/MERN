/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';

export default class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {participatingTeams: []};
  }

  componentDidMount() {
    API.getTournament('5d595b1f149ccb41b5543639').then(res => {
      this.setState(prevState => {
        return {
          participatingTeams: res.data.participatingTeams,
        };
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row mb-3">
          <div className="col-12">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-sm btn-success">
                <input type="radio" name="options" id="option1" autocomplete="off" checked="" /> Pool
              </label>
              <label class="btn btn-sm btn-success">
                <input type="radio" name="options" id="option2" autocomplete="off" /> Overall
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table class="table table-hover table-sm">
              <thead>
                <tr>
                  <th scope="col">Teams</th>
                  <th scope="col">Played</th>
                  <th scope="col">Won</th>
                  <th scope="col">Lost</th>
                  <th scope="col">Tied</th>
                  <th scope="col">N/R</th>
                  <th scope="col">NRR</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              <tbody>
                {this.state.participatingTeams.map(team => {
                  return (
                    <tr>
                      <td>{team.teamId.name}</td>
                      <td>{team.totalMatches}</td>
                      <td>{team.totalWins}</td>
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
