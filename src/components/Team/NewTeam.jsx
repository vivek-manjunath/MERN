/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import TextInput from '../Elements/TextInput';
import Alert from 'react-s-alert';

export default class NewTeam extends Component {
  constructor() {
    super();
    this.state = {
      teamInfo: {
        name: {
          value: '',
          placeholder: 'Team Name',
        },
      },
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    API.saveTeam({name: this.state.teamInfo.name, isActive: true}).then(res =>
      Alert.success(`${res.data.name} added`, {
        position: 'bottom-right',
        effect: 'slide',
      }),
    );
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      prevState => {
        return {
          teamInfo: {...prevState.teamInfo, [name]: value},
        };
      },
      () => console.log(this.state.teamInfo),
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-5">
            <div className="card bg-light border-radius-5px">
              <div className="card-header">Add new team</div>
              <div className="card-body">
                <div className="form-group">
                  <label for="ipTeamName">Team Name</label>
                  <TextInput
                    id="ipTeamName"
                    name="name"
                    className="form-control"
                    value={this.state.teamInfo.name.value}
                    placeholder={this.state.teamInfo.name.placeholder}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
