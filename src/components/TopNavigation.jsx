/** @format */

import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Login from './User/Login';
import API from '../utils/API';

const navBarStyle = {
  backgroundColor: '#e3f2fd',
};

class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {showLogin: false, email: '', password: ''};
  }

  handleClose = e => {
    this.setState({showLogin: false});
  };

  handleShow = e => {
    this.setState({showLogin: true});
  };

  login = (email, password) => {
    API.login(email, password).then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          loggedInUserName: res.data.name,
        };
      });
      this.handleClose();
    });
  };
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-expand-lg navbar-dark fixed-top bg-tcl-header" expand="lg">
          <Navbar.Brand as={Link} to="/Home">
            <strong>TCL</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/Teams">
                Teams
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/Schedule">
                Schedule
              </Nav.Link> */}
              <Nav.Link as={Link} to="/Results">
                Schedule & Results
              </Nav.Link>
              <Nav.Link as={Link} to="/Standings">
                Standings
              </Nav.Link>
              <Nav.Link as={Link} to="/Stats">
                Stats
              </Nav.Link>
              <Nav.Link as={Link} to="/About">
                About TCL
              </Nav.Link>
            </Nav>
            <Nav>
              {this.state.loggedInUserName ? (
                <NavDropdown title={this.state.loggedInUserName ? 'Hello, ' + this.state.loggedInUserName : 'User'} className="navbar-nav" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/NewTeam">
                    Add New Team
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/CreateFixture">
                    Create Fixture
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/ManagePlayer">
                    Manage Player
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/Register">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/CreateTournament">
                    Create Tournament
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={this.handleShow}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Login showLogin={this.state.showLogin} hideLoginHandler={this.handleClose} loginHandler={this.login} />
      </div>
    );
  }
}

export default TopNavigation;
