/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import TextInput from '../Elements/TextInput';
import Select from 'react-select';
import Common from '../../utils/Common';
import DatePicker, {registerLocale} from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

export default class CreateFixture extends Component {
  constructor() {
    super();
    this.state = {
      tournaments: [],
      teams: [],
      venues: [{venueId: 1, venueName: 'Evans 1'}, {venueId: 1, venueName: 'Evans 2'}, {venueId: 1, venueName: 'Evans Center'}],
      fixtureInfo: {
        tournamentId: '',
        homeTeamId: '',
        awayTeamId: '',
      },
    };
  }

  handleDateChange = date => {
    this.setState(prevState => {
      return {
        fixtureInfo: {...prevState.fixtureInfo, datePlayed: date},
      };
    });
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => {
      return {
        fixtureInfo: {...prevState.fixtureInfo, [name]: value},
      };
    });
  };

  componentDidMount() {
    API.getTournaments()
      .then(res => this.setState({tournaments: res.data}))
      .catch(err => console.log(err));

    API.getTeams()
      .then(res => this.setState({teams: res.data}))
      .catch(err => console.log(err));
  }
  handleSubmit = e => {
    e.preventDefault();

    API.saveMatch({
      awayTeamId: this.state.fixtureInfo.awayTeamId,
      datePlayed: this.state.fixtureInfo.datePlayed.toLocaleString(),
      homeTeamId: this.state.fixtureInfo.homeTeamId,
      tournamentId: this.state.fixtureInfo.tournamentId,
      umpiringTeamId: this.state.fixtureInfo.umpiringTeamId,
      venue: this.state.fixtureInfo.venue,
    })
      .then(res => Common.alertSuccess('new match created'))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-8">
              <div className="card bg-light border-radius-5px">
                <div className="card-header">Create fixture</div>
                <div className="card-body">
                  <div className="form-row">
                    <div class="form-group col-md-6">
                      <label htmlFor="selectTeam1">Home Team</label>
                      <select id="selHomeTeam" name="homeTeamId" class="form-control" onChange={this.changeHandler}>
                        <option selected>Select</option>
                        {this.state.teams.map(team => {
                          return (
                            <option id={team._id} key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="selectTeam2">Away Team</label>
                      <select id="selAwayTeam" name="awayTeamId" class="form-control" onChange={this.changeHandler}>
                        <option selected>Select</option>
                        {this.state.teams.map(team => {
                          return (
                            <option id={team._id} key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div class="form-group col-md-6">
                      <label for="selectUmpiringTeam">Umpiring Team</label>
                      <select id="selectUmpiringTeam" class="form-control" name="umpiringTeamId" onChange={this.changeHandler}>
                        <option selected>Select</option>
                        {this.state.teams.map(team => {
                          return (
                            <option id={team._id} key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label htmlFor="selectTournament">Tournament</label>
                      <select id="selectTournament" name="tournamentId" class="form-control" onChange={this.changeHandler}>
                        <option selected>Choose...</option>
                        {this.state.tournaments.map(tournament => {
                          return (
                            <option id={tournament._id} key={tournament._id} value={tournament._id}>
                              {tournament.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div class="form-group col-md-6">
                      <label for="selectVenue">Venue</label>
                      <select id="selectVenue" name="venue" class="form-control" onChange={this.changeHandler}>
                        <option selected>Select</option>
                        {this.state.venues.map(venue => {
                          return <option value={venue.venueName}>{venue.venueName}</option>;
                        })}
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputDate">Date</label>
                      <DatePicker
                        id="inputDate"
                        className="form-control"
                        name="datePlayed"
                        showTimeSelect
                        dateFormat="MM/dd/yyyy h:mm aa"
                        timeFormat="h:mm aa"
                        selected={this.state.fixtureInfo.datePlayed}
                        onChange={this.handleDateChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="form-row" />
                </div>
                <div className="card-footer text-center">
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
