/** @format */

import React, {Component} from 'react';
import axios from 'axios';
import API from '../../utils/API';

export default class PlayerProfile extends Component {
  constructor() {
    super();
    this.state = {playerInfo: {}};
  }

  componentDidMount() {
    this.getPlayersById();
  }

  getPlayersById = () => {
    API.getPlayer(this.props.match.params.playerId).then(res => {
      this.setState({playerInfo: res.data});
    });
  };
  render() {
    let playerFullName = this.state.playerInfo.firstName + ' ' + this.state.playerInfo.middleName + ' ' + this.state.playerInfo.lastName;
    return (
      // <div class="jumbotron jumbotron-fluid bg-grey">
      //   <div class="container">
      //     <h1 class="display-4">{playerFullName}</h1>
      //     <p class="lead">
      //       <div class="row no-gutters align-items-center">
      //         <div class="col mr-2">
      //           <div class="text-xs text-success text-uppercase mb-1">
      //             Matches
      //           </div>
      //           <div class="h5 mb-0 font-weight-bold text-gray-800">
      //             {this.state.playerInfo.totalMatches}
      //           </div>
      //         </div>
      //         <div class="col mr-2">
      //           <div class="text-xs text-success text-uppercase mb-1">Runs</div>
      //           <div class="h5 mb-0 font-weight-bold text-gray-800">
      //             {this.state.playerInfo.runsScored}
      //           </div>
      //         </div>
      //         <div class="col mr-2">
      //           <div class="text-xs text-success text-uppercase mb-1">
      //             Wickets
      //           </div>
      //           <div class="h5 mb-0 font-weight-bold text-gray-800">
      //             {this.state.playerInfo.wickets}
      //           </div>
      //         </div>
      //       </div>
      //     </p>
      //   </div>
      // </div>
      <div class="card text-white bg-primary mb-3 border-radius-5px">
        <div class="card-body">
          <div className="row">
            <div className="col-6">
              <h1 class="card-title player-name">
                {this.state.playerInfo.firstName}
                <br />
                <span>{this.state.playerInfo.lastName}</span>
              </h1>
            </div>
            <div className="col-6">
              <ul className="player-stats">
                <li>
                  <span className="player-stats-label">Matches</span>
                  <span className="player-stats-value">2</span>
                </li>
                <li>
                  <span className="player-stats-label">Runs</span>
                  <span className="player-stats-value">{this.state.playerInfo.runsScored ? this.state.playerInfo.runsScored : 0}</span>
                </li>
                <li>
                  <span className="player-stats-label">Wickets</span>
                  <span className="player-stats-value">{this.state.playerInfo.wicketsTaken ? this.state.playerInfo.wicketsTaken : 0}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
