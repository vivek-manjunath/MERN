import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <div className="form-group row">
            <label htmlFor="inputUsername" class="col-sm-2 col-form-label">
              Username
            </label>
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control"
                id="inputUsername"
                placeholder="Username"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Password
            </label>
            <div class="col-sm-4">
              <input
                type="password"
                class="form-control"
                id="inputPassword3"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-success">
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
