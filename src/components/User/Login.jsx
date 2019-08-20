/** @format */

import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeHandler = e => {
    const {name, value} = e.target;

    this.setState(
      prevState => {
        return {
          ...prevState,
          [name]: value,
        };
      },
      () => console.log(this.state),
    );
  };

  loginClick = () => {
    this.props.loginHandler(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Modal show={this.props.showLogin} onHide={this.props.hideLoginHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row justify-content-center">
                <div className="col-sm-12">
                  <div class="form-group">
                    <label for="ipEmail">Email address</label>
                    <input type="email" class="form-control" id="ipEmail" name="email" onChange={this.changeHandler} aria-describedby="emailHelp" placeholder="Enter email" />
                  </div>
                  <div class="form-group">
                    <label for="ipPassword">Password</label>
                    <input type="password" class="form-control" id="ipPassword" name="password" onChange={this.changeHandler} placeholder="Password" />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="text-center">
                <button class="btn btn-primary" type="submit" onClick={this.loginClick}>
                  Login
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    );
  }
}
