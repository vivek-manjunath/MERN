import React, { Component } from "react";
import TextInput from "../Elements/TextInput";
import API from "../../utils/API";

export default class TournamentMain extends Component {
  constructor() {
    super();
    this.state = {
      tournamentInfo: {
        name: {
          value: "",
          placeholder: "Tournament Name"
        }
      }
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    API.saveTournament({ name: this.state.tournamentInfo.name, isActive: true })
      .then(res => console.log('New tournament created!'));
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => {
      return {
        tournamentInfo: { ...prevState.tournamentInfo, [name]: value }
      }
      
    }, () => console.log(this.state.tournamentInfo))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
            <label htmlFor="inputTournamentName">Tournament Name</label>
                <TextInput                  
                  id="inputTournamentName"
                  name="name"
                  value={this.state.tournamentInfo.name.value}
                  placeholder={this.state.tournamentInfo.name.placeholder}
                  onChange = {this.changeHandler}/>
              </div>
          </div>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </div>
    );
  }
}
