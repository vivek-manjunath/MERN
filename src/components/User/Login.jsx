/** @format */

import React, {Component} from 'react';

export default class Login extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-5 tcl-form">
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
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
