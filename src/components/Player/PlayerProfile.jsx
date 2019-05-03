import React, { Component } from "react";
import axios from "axios";
import API from "../../utils/API";

export default class PlayerProfile extends Component {
  constructor() {
    super();
    this.state = { playerInfo: {} };
  }

  componentDidMount() {
    this.getPlayersById();
  }

  getPlayersById = () => {
    API.getPlayer(this.props.match.params.playerId)      
      .then(res => {
        this.setState({ playerInfo: res.data });
      });
  };
  render() {
    let playerFullName =
      this.state.playerInfo.firstName +
      " " +
      this.state.playerInfo.middleName +
      " " +
      this.state.playerInfo.lastName;
    return (
      <div class="jumbotron jumbotron-fluid bg-white bd-callout-warning shadow">
        <div class="container">
          <h1 class="display-4">{playerFullName}</h1>
          <p class="lead">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs text-success text-uppercase mb-1">
                  Matches
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {this.state.playerInfo.totalMatches}
                </div>
              </div>
              <div class="col mr-2">
                <div class="text-xs text-success text-uppercase mb-1">Runs</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {this.state.playerInfo.runsScored}
                </div>
              </div>
              <div class="col mr-2">
                <div class="text-xs text-success text-uppercase mb-1">
                  Wickets
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {this.state.playerInfo.wickets}
                </div>
              </div>
            </div>
          </p>
        </div>
      </div>
    );
  }
}
