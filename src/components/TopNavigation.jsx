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
      // <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
      //   <Link to="/" className="navbar-brand" href="#">
      //     TCL
      //   </Link>
      //   <button
      //     className="navbar-toggler"
      //     type="button"
      //     data-toggle="collapse"
      //     data-target="#navbarNavDropdown"
      //     aria-controls="navbarNavDropdown"
      //     aria-expanded="false"
      //     aria-label="Toggle navigation"
      //   >
      //     <span className="navbar-toggler-icon" />
      //   </button>
      //   <div
      //     className="collapse navbar-collapse justify-content-center"
      //     id="navbarNavDropdown"
      //   >
      //     <ul className="navbar-nav mr-auto">
      //       <li className="nav-item">
      //         <Link to="/Home" className="nav-link">
      //           Home
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link to="/Results" className="nav-link">
      //           Results
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link" to="/Stats">
      //           Stats
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link" to="/Teams">
      //           Teams
      //         </Link>
      //       </li>
      //       <li className="nav-item">
      //         <Link className="nav-link" to="/About">
      //           About TCL
      //         </Link>
      //       </li>
      //     </ul>
      //     <ul className="navbar-nav">
      //     <li className="nav-item my-2 my-lg-0">
      //         <Link className="nav-link" to="/Login">
      //           Login
      //         </Link>
      //       </li>
      //       <li className="nav-item dropdown">
      //         <a
      //           className="nav-link dropdown-toggle"
      //           data-toggle="dropdown"
      //           href="#"
      //           role="button"
      //           aria-haspopup="true"
      //           aria-expanded="false"
      //         >
      //           Admin
      //         </a>
      //         <div className="dropdown-menu">
      //           <Link className="dropdown-item" to="/NewTeam">
      //             Add New Team
      //           </Link>
      //           <Link className="dropdown-item" to="/CreateFixture">
      //             Create Fixture
      //           </Link>
      //           <Link className="dropdown-item" to="/ManagePlayer">
      //             Manage Player
      //           </Link>
      //         </div>
      //       </li>
      //     </ul>
      //   </div>
      //   <hr />
      // </nav>
      <div>
        <Navbar
          className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary"
          expand="lg">
          <Navbar.Brand as={Link} to="/Home">
            <strong>Tampa Cricket League</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/Teams">
                Teams
              </Nav.Link>
              <Nav.Link as={Link} to="/Schedule">
                Schedule
              </Nav.Link>
              <Nav.Link as={Link} to="/Results">
                Results
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
                <NavDropdown
                  title={
                    this.state.loggedInUserName
                      ? 'Hello, ' + this.state.loggedInUserName
                      : 'User'
                  }
                  className="navbar-nav"
                  id="basic-nav-dropdown">
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
                </NavDropdown>
              ) : (
                <Nav.Link onClick={this.handleShow}>Login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Login
          showLogin={this.state.showLogin}
          hideLoginHandler={this.handleClose}
          loginHandler={this.login}
        />
      </div>
    );
  }
}

export default TopNavigation;
