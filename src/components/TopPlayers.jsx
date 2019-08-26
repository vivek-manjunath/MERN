/** @format */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import PlayerLink from './Player/PlayerLink';

export default class TopPlayers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div class="card shadow">
          <div class="card-header font-weight-bold text-info m-0">{this.props.title}</div>
          <div className="card-body">
            <ul class="list-group list-group-flush">
              {this.props.players &&
                this.props.players.map(player => {
                  return (
                    <li class="list-group-item home-card-item">
                      <PlayerLink playerName={player.fullName} className="" playerProfileUrl={`/PlayerProfile/${player._id}`} />
                      {this.props.statType == 'topThreeBatsmen' && <span className="text-muted sub-title">Runs: {player.runsScored}</span>}
                      {this.props.statType == 'topThreeBowlers' && <span className="text-muted sub-title">Wickets: {player.wicketsTaken}</span>}
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
