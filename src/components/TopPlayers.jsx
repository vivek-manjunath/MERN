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
              <li class="list-group-item">Cras justo odio</li>
              <li class="list-group-item">Dapibus ac facilisis in</li>
              <li class="list-group-item">Morbi leo risus</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
