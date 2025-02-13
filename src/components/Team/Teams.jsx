/** @format */

import React, {Component} from 'react';
import API from '../../utils/API';
import TeamCard from './TeamCard';
import ErrorBoundary from '../ErrorBoundary';
import Alert from 'react-s-alert';

class Teams extends Component {
  constructor() {
    super();
    this.state = {teams: []};
  }

  componentDidMount() {
    this.loadTeams();
  }

  deleteTeamClick = (id, e) => {
    e.preventDefault();
    API.deleteTeam(id)
      .then(res => {
        this.setState({teams: res.data});
        Alert.success(`Team deleted successfully`, {
          position: 'bottom-right',
          effect: 'slide',
        });
      })
      .catch(err => console.log(err));
  };

  loadTeams = () => {
    API.getTeams()
      .then(res => {
        this.setState({teams: res.data});
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="container-fluid section">
          <div className="row">
            {this.state.teams.map(team => {
              return (
                <div className="col-md-3" key={team._id}>
                  <TeamCard
                    teamId={team._id}
                    teamName={team.name}
                    deleteClickHandler={this.deleteTeamClick.bind(this, team._id)}
                    teamProfileUrl={`${this.props.match.path}/${team._id}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Teams;
