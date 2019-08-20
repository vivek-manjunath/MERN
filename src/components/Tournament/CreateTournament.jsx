/** @format */

import React, {Component} from 'react';
import TextInput from '../Elements/TextInput';
import API from '../../utils/API';
import Common from '../../utils/Common';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';

export default class CreateTournament extends Component {
  constructor() {
    super();
    this.state = {
      tournamentInfo: {
        name: {
          value: '',
          placeholder: 'Tournament Name',
        },
        pools: [''],
      },
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    API.saveTournament({name: this.state.tournamentInfo.name, isActive: true}).then(res => Common.alertSuccess('Tournament created'));
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => {
      return {
        tournamentInfo: {...prevState.tournamentInfo, [name]: value},
      };
    });
  };

  // addPool = () => {
  //   this.setState(prevState => {
  //     var newPool = '';
  //     return {
  //       pools: [...prevState.pools, newPool],
  //     };
  //   });
  // };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="inputTournamentName" className="col-sm-2 col-form-label">
              Tournament Name
            </label>
            <div class="col-sm-5">
              <input type="text" className="form-control" id="inputTournamentName" name="name" value={this.state.tournamentInfo.name.value} onChange={this.changeHandler} />
            </div>
            {/* <TextInput
              id="inputTournamentName"
              name="name"
              className="form-control"
              value={this.state.tournamentInfo.name.value}
              placeholder={this.state.tournamentInfo.name.placeholder}
              onChange={this.changeHandler}
            /> */}
          </div>
          {/* <div class="form-group row">
            <label for="inputEmail3" className="col-sm-2 col-form-label">
              Pools
            </label>
            <div class="col-sm-5">
              {this.state.pools.map(pool => {
                return <input type="text" className="form-control mb-2" id="ipPools" value={pool} name="pool" onChange={this.changeHandler} />;
              })}
            </div>
            <div className="col-sm-1">
              <a onClick={this.addPool}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </a>
            </div>
          </div> */}
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}
