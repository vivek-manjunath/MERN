import React, { Component } from "react";
import TeamOverview from "./TeamOverview";
import TeamSquad from "./TeamSquad";
import TeamContact from "./TeamContact";
import API from "../../utils/API";
import ManagePlayer from "../Player/ManagePlayer";

export default class TeamProfile extends Component {
  constructor() {
    super();
    this.state = { teamData: { captainId: {}, refershSquad: false } };
  }

  componentDidMount() {
    API.getTeam(this.props.match.params.id).then(res => {
      this.setState({ teamData: res.data }, () => {
        console.log(this.state.teamData);
      });
    });
  }

  refreshSquadCallBack = () => {
    this.setState({ refershSquad: !this.state.refershSquad });
  };

  render() {
    if (this.state.teamData) {
      return (
        <div>
          {this.state.teamData.name && (
            <div>
              <div className="card bg-white mb-3">
                <div className="card-body">
                  <h1>{this.state.teamData.name}</h1>
                  <h5 className="text-dark">
                    <strong>Captain:&nbsp;</strong>
                    {(this.state.teamData.captainId)?this.state.teamData.captainId.firstName : 'FNU'}
                  </h5>
                </div>
              </div>

              {/* <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">                
                <a
                  className="nav-item nav-link active"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Squad
                </a>
                <a
                  className="nav-item nav-link"
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                >
                  Contact
                </a>
              </div>
            </nav> */}
              {/* <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <TeamSquad teamId={this.props.match.params.id} />
              </div>
              <div
                className="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <TeamContact />
              </div>
            </div> */}
              <div className="row">
                <div className="col-1">
                  <h4>Squad</h4>
                </div>
                <div className="col-11">
                  <ManagePlayer
                    teamId={this.state.teamData._id}
                    refreshSquad={this.refreshSquadCallBack}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <TeamSquad
                    teamId={this.state.teamData._id}
                    refresh={this.state.refershSquad}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  }
}
