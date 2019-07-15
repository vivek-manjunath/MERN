import React, { Component } from "react";
import API from "../../utils/API";
import TextInput from "../Elements/TextInput";
import Select from "react-select";
import Common from "../../utils/Common";

export default class CreateFixture extends Component {
  constructor() {
    super();
    this.state = {
      tournaments: [],
      teams: [],
      venues: [],
      fixtureInfo: {
        tournamentId: "",
        homeTeamId: "",
        awayTeamId: ""
      }
    };
  }

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      prevState => {
        return {
          fixtureInfo: { ...prevState.fixtureInfo, [name]: value }
        };
      },
      () => console.log(this.state.fixtureInfo)
    );
  };

  componentDidMount() {
    API.getTournaments()
      .then(res => this.setState({ tournaments: res.data }))
      .catch(err => console.log(err));

    API.getTeams()
      .then(res => this.setState({ teams: res.data }))
      .catch(err => console.log(err));

    // axios.get('api/getVenues')
    // .then((res) => res.data )
    // .then( (res) => {
    //     this.setState({venues: res})
    //     console.log(res);
    // })
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState(
      prevState => {
        return {
          fixtureInfo: { ...prevState.fixtureInfo }
        };
      },
      () => {
        API.saveMatch(this.state.fixtureInfo)
          .then(res => Common.alertSuccess("new match created"))
          .catch(err => console.log(err));
      }
    );
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div class="form-group col-md-6">
              <label for="inputDate">Date</label>
              <input
                type="Date"
                class="form-control"
                id="inputDate"
                placeholder="Date"
                name="datePlayed"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputTime">Time</label>
              <input
                type="text"
                class="form-control"
                id="inputTime"
                placeholder="Time"
                name="timePlayed"
              />
            </div>
          </div>
          <div className="form-row">
            <div class="form-group col-md-6">
              <label htmlFor="selectTeam1">Team 1</label>
              <select
                id="selectTeam1"
                name="homeTeamId"
                class="form-control"
                onChange={this.changeHandler}
              >
                <option selected>Choose...</option>
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
              <label for="selectTeam2">Team 2</label>
              <select
                id="selectTeam2"
                name="awayTeamId"
                class="form-control"
                onChange={this.changeHandler}
              >
                <option selected>Choose...</option>
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
              <label for="selectVenue">Venue</label>
              <select
                id="selectVenue"
                class="form-control"
                onChange={this.changeHandler}
              >
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group col-md-6">
              <label for="selectUmpiringTeam">Umpiring Team</label>
              <select id="selectUmpiringTeam" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div class="form-group col-md-6">
              <label htmlFor="selectTournament">Tournament</label>
              <select
                id="selectTournament"
                name="tournamentId"
                class="form-control"
                onChange={this.changeHandler}
              >
                <option selected>Choose...</option>
                {this.state.tournaments.map(tournament => {
                  return (
                    <option
                      id={tournament._id}
                      key={tournament._id}
                      value={tournament._id}
                    >
                      {tournament.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
            </div>
            <div class="form-group">
                <label for="inputAddress2">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
                </div>
                <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip">
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                    Check me out
                </label>
                </div>
            </div> */}
          <button type="submit" class="btn btn-success">
            Save
          </button>
        </form>
      </div>
    );
  }
}
