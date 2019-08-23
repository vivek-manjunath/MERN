/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import Select from 'react-select';

export default class Filter extends Component {
  constructor() {
    super();
    this.state = {tournaments: [], teams: [], venues: []};
  }

  componentDidMount() {
    API.getTournaments()
      .then(res => {
        let tournamentOptions = res.data.map(tournament => {
          return {value: tournament._id, label: tournament.name};
        });
        this.setState({tournamentOptions: tournamentOptions});
      })
      .catch(err => console.log(err));

    API.getTeams()
      .then(res => {
        let teamOptions = res.data.map(team => {
          return {value: team._id, label: team.name};
        });
        this.setState({teamOptions: teamOptions});
      })
      .catch(err => console.log(err));

    // axios.get('api/getVenues')
    // .then((res) => res.data )
    // .then( (res) => {
    // this.setState({venues: res})
    // console.log(res);
    // })
  }

  render() {
    return (
      <div>
        <form action="">
          <div className="form-group">
            <label for="selTournament">Tournament</label>
            <Select id="selTournament" name="tournament" onChange={this.filterChangeHandler} options={this.state.tournamentOptions} />
          </div>
          <div className="form-group">
            <label for="selTeam">Team</label>
            <Select id="selTeam" options={this.state.teamOptions} />
          </div>
          <div className="form-group">
            <label for="selVenue">Venue</label>
            <Select id="selVenue" options={this.state.venueOptions} />
          </div>
        </form>
      </div>
    );
  }
}
