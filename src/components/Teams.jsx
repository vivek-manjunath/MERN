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
                <div key={team._id} className="card text-center text-white bg-primary mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{team.name}</h5>
                    <Link
                      className="card-link"
                      to={`${this.props.match.path}/${team._id}`}
                    >
                      Team Profile
                    </Link>                    
                    <a className="card-link text-danger" href="" onClick={this.deleteTeamClick.bind(this, team._id)}>Delete Team</a>
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
