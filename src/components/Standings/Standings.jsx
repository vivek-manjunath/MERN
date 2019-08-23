/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import Overall from '../Standings/Overall';
import ByPool from './ByPool';

export default class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {participatingTeams: []};
  }

  componentDidMount() {
    API.getTournament('5d595b1f149ccb41b5543639').then(res => {
      if (res && res.data) {
        this.setState(prevState => {
          return {
            participatingTeams: res.data.participatingTeams,
          };
        });
      }
    });
  }

  handelChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };

  render() {
    return (
      <div>
        <div className="row mb-3">
          <div className="col-12">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-sm btn-success">
                <input type="radio" name="view" value="byPool" id="option1" onChange={this.handelChange} autocomplete="off" checked="" /> Pool
              </label>
              <label class="btn btn-sm btn-success">
                <input type="radio" name="view" value="overall" id="option2" onChange={this.handelChange} autocomplete="off" /> Overall
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
