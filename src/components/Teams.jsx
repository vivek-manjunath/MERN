import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";

const teamCardStyle = {
  // marginBottom: "0.5em"
};

class Teams extends Component {
  constructor() {
    super();
    this.state = { teams: [] };    
  }

  componentDidMount() {
    this.loadTeams();
  }

  deleteTeamClick(id, e) { 
    e.preventDefault();       
    API.deleteTeam(id)
      .then(res => this.setState({teams: res.data}))
      .catch(err => console.log(err))    
  }

  loadTeams = () => {
    API.getTeams()      
        .then(res => {
          this.setState({ teams: res.data });
        })
        .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="row">
          {this.state.teams.map(team => {
            return (
              <div className="col-md-3" key={team._id}>
                <div key={team._id} className="ibox">
                  <div className="ibox-content text-center">
                    <h3>{team.name}</h3>
                    <Link
                      className="btn btn-xs btn-outline btn-primary"
                      to={`${this.props.match.path}/${team._id}`}
                    >
                      Team Profile
                    </Link>                    
                    <a className="btn btn-xs btn-outline btn-danger" href="" onClick={this.deleteTeamClick.bind(this, team._id)}>Delete Team</a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Teams;
