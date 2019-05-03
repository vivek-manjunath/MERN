import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const navBarStyle = {
  backgroundColor: "#e3f2fd"
};

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-primary">
        <Link to="/" className="navbar-brand" href="#">
          TCL
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/Home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Results" className="nav-link">
                Results
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Stats">
                Stats
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Teams">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">
                About TCL
              </Link>
            </li>            
          </ul>
          <ul className="navbar-nav">
          <li className="nav-item my-2 my-lg-0">
              <Link className="nav-link" to="/Login">
                Login
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </a>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/NewTeam">
                  Add New Team
                </Link>
                <Link className="dropdown-item" to="/CreateFixture">
                  Create Fixture
                </Link>
                <Link className="dropdown-item" to="/ManagePlayer">
                  Manage Player
                </Link>                
              </div>
            </li>
          </ul>
        </div>
        <hr />
      </nav>
    );
  }
}

export default Navbar;
