import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default class TopPlayers extends Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <div>
        <div className="card bg-primary text-white">
          <div className="card-header">
            <div className="row align-items-center">
              <div class="col">
                <h4 class="card-header-title">{this.props.title}</h4>
              </div>
              <div class="col-auto">
                <a href="#!" class="small">
                  View all
                </a>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div class="col-auto">
                <a href="project-overview.html" class="avatar avatar-4by3">
                  {/* <img
                    src="assets/img/avatars/projects/project-1.jpg"
                    alt="..."
                    class="avatar-img rounded"
                  /> */}
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </a>
              </div>
              <div class="col ml-n2">
                <h6 class="card-title mb-1">
                  <a href="project-overview.html">Player 1</a>
                </h6>

                <p class="card-text small text-muted">
                  <time datetime="2018-05-24">Points: 6705</time>
                </p>
              </div>
            </div>
            <hr />
            <div className="row align-items-center">
              <div class="col-auto">
                <a href="project-overview.html" class="avatar avatar-4by3">
                  {/* <img
                    src="assets/img/avatars/projects/project-1.jpg"
                    alt="..."
                    class="avatar-img rounded"
                  /> */}
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </a>
              </div>
              <div class="col ml-n2">
                <h6 class="card-title mb-1">
                  <a href="project-overview.html">Player 2</a>
                </h6>

                <p class="card-text small text-muted">
                  <time datetime="2018-05-24">Points: 5555</time>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
