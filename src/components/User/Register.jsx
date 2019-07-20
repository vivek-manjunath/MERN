/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {userInfo: {}};
  }

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      prevState => {
        return {
          userInfo: {...prevState.userInfo, [name]: value},
        };
      },
      () => console.log(this.state.userInfo),
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    API.register(this.state.userInfo).then(res =>
      console.log('User registered'),
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-5 tcl-form">
              <div class="form-group">
                <label for="ipName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="ipName"
                  name="name"
                  onChange={this.changeHandler}
                  aria-describedby="emailHelp"
                  placeholder="Enter full name"
                />
              </div>
              <div class="form-group">
                <label for="ipEmail">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="ipEmail"
                  name="email"
                  onChange={this.changeHandler}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="ipPassword">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="ipPassword"
                  name="password"
                  onChange={this.changeHandler}
                  placeholder="Password"
                />
              </div>
              <div className="">
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
