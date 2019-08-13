/** @format */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

export default class TopPlayers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div class="card">
          <div class="card-header">{this.props.title}</div>
          <div className="card-body">
            <ul class="list-group list-group-flush">
              {this.props.players &&
                this.props.players.map(player => {
                  return (
                    <li class="list-group-item">
                      <h6 className="font-weight-bold">
                        {player.firstName}&nbsp;{player.lastName}
                      </h6>
                      {this.props.statType == 'topThreeBatsmen' && <h6 className="card-subtitle mb-2 text-muted">Runs: {player.runsScored}</h6>}
                      {this.props.statType == 'topThreeBowlers' && <h6 className="card-subtitle mb-2 text-muted">Wickets: {player.wicketsTaken}</h6>}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
