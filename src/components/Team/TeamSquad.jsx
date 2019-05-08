import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import API from "../../utils/API";

const playerItemStyle = {  
  width: "20rem"
};

export default class TeamSquad extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
  }

  componentDidMount() {
    this.getPlayersByTeam();
  }

  getPlayersByTeam = () => {
    API.getPlayersByTeam(this.props.teamId) //TODO: repace with team id
      .then(res => {
        this.setState({ players: res.data });
      });
  };

  render() {
    if(this.state.players && this.state.players.length > 0){
    return (
      <div style={playerItemStyle}>
        {          
          this.state.players.map(player => {
          let playerFullName =
            player.firstName + " " + player.middleName + " " + player.lastName;
          return (
            <Link
              key={player._id}
              href="#"
              className="list-group-item list-group-item-action"
              to={`/PlayerProfile/${player._id}`}
            >
              {" "}
              <div className="row">
                <div className="col-9">{playerFullName}</div>
                <div className="col-3 text-right">
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
      }
      else{
        return(
          <div>
            <h6>Squad not available</h6>
          </div>
        )
      }
  }
}
