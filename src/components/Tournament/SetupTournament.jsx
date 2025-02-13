/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import Common from '../../utils/Common';
import Pool from './Pool';

export default class SetupTournament extends Component {
  constructor() {
    super();
    this.state = {teams: [], tournaments: [], selectedTournamentId: '', selectedPool: '', selectedTournamentInfo: {}, participatingTeams: []};
  }

  componentDidMount() {
    API.getTeams()
      .then(res => {
        this.setState({teams: res.data});
      })
      .catch(err => console.log(err));

    API.getTournaments()
      .then(res => {
        this.setState({tournaments: res.data});
      })
      .catch(err => console.log(err));
  }

  changeHandler = e => {
    const {name, value} = e.target;

    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value,
        };
      },
      () => {
        if (this.state.selectedTournamentId) {
          var selectedTournament = this.state.tournaments.filter(tournament => this.state.selectedTournamentId === tournament._id);
          this.setState(prevState => {
            return {
              selectedTournamentInfo: selectedTournament[0],
            };
          });
        }
      },
    );
  };

  teamSelection = e => {
    const {name, value} = e.target;
    this.setState(
      prevState => {
        return {
          ...prevState,
          participatingTeams: [...prevState.participatingTeams, value],
        };
      },
      () => {},
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    API.updateTournament(this.state.selectedTournamentId, {selectedPool: this.state.selectedPool, participatingTeams: this.state.participatingTeams}).then(res =>
      Common.alertSuccess('Tournament updated'),
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group">
                    <label for="selTournament" className="form-label">
                      Tournament
                    </label>
                    <select id="selTournament" className="form-control" name="selectedTournamentId" onChange={this.changeHandler}>
                      <option>--Select--</option>
                      {this.state.tournaments.map(tournament => {
                        return <option value={tournament._id}>{tournament.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="selPool" className="form-label">
                      Pool
                    </label>
                    <select id="selTournament" className="form-control" name="selectedPool" value={this.state.selectedPool} onChange={this.changeHandler}>
                      <option>--Select--</option>
                      {this.state.selectedTournamentInfo &&
                        this.state.selectedTournamentInfo.pools &&
                        this.state.selectedTournamentInfo.pools.map(pool => {
                          return <option value={pool}>{pool}</option>;
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th />
                        <th scope="col">Registered Teams</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.teams.map(team => {
                        return (
                          <tr>
                            <td>
                              <input
                                type="checkbox"
                                value={team._id}
                                onChange={this.teamSelection}
                                disabled={
                                  this.state.selectedTournamentInfo &&
                                  this.state.selectedTournamentInfo.participatingTeams &&
                                  this.state.selectedTournamentInfo.participatingTeams.filter(t => t.teamId === team._id).length > 0
                                    ? 'disabled'
                                    : ''
                                }
                              />
                            </td>
                            <td>{team.name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <Pool
                    poolName="Pool A"
                    participatingTeams={
                      this.state.selectedTournamentInfo &&
                      this.state.selectedTournamentInfo.participatingTeams &&
                      this.state.selectedTournamentInfo.participatingTeams.filter(t => t.pool === 'Pool A')
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <Pool
                    poolName="Pool B"
                    participatingTeams={
                      this.state.selectedTournamentInfo &&
                      this.state.selectedTournamentInfo.participatingTeams &&
                      this.state.selectedTournamentInfo.participatingTeams.filter(t => t.pool === 'Pool B')
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <Pool
                    poolName="Pool C"
                    participatingTeams={
                      this.state.selectedTournamentInfo &&
                      this.state.selectedTournamentInfo.participatingTeams &&
                      this.state.selectedTournamentInfo.participatingTeams.filter(t => t.pool === 'Pool C')
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
