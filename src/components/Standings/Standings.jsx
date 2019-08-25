/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import Overall from '../Standings/Overall';
import ByPool from './ByPool';

export default class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {participatingTeams: [], tournaments: [], view: 'overall'};
  }

  componentDidMount() {
    API.getTournaments()
      .then(res => {
        this.setState({tournaments: res.data});
      })
      .catch(err => console.log(err));
  }

  handelChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  tournamentChangeHandler = e => {
    const {name, value} = e.target;

    API.getTournament(value).then(res => {
      if (res && res.data) {
        this.setState(prevState => {
          return {
            participatingTeams: res.data.participatingTeams,
          };
        });
      }
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label for="selTournament" className="form-label">
                Tournament
              </label>
              <select id="selTournament" className="form-control" name="selectedTournamentId" onChange={this.tournamentChangeHandler}>
                <option>--Select--</option>
                {this.state.tournaments.map(tournament => {
                  return <option value={tournament._id}>{tournament.name}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-sm btn-primary">
                <input type="radio" name="view" value="overall" id="option2" onChange={this.handelChange} autocomplete="off" /> Overall
              </label>
              <label class="btn btn-sm btn-primary">
                <input type="radio" name="view" value="byPool" id="option1" onChange={this.handelChange} autocomplete="off" checked="" /> Pool
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.state.view === 'overall' && <Overall teams={this.state.participatingTeams} />}
            {this.state.view === 'byPool' && <ByPool teams={this.state.participatingTeams} />}
          </div>
        </div>
      </div>
    );
  }
}
