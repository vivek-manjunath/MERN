import React, { Component } from "react";
import API from "../../utils/API";
import TextInput from "../Elements/TextInput";
import Alert from "react-s-alert";

export default class NewTeam extends Component {

  constructor() {
    super();
    this.state = {teamInfo: {
        name: {
          value: '',
          placeholder: 'Team Name'
      }
    }};    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    API.saveTeam({ name: this.state.teamInfo.name, isActive: true })
      .then(res => Alert.success(`${res.data.name} added`,{
        position: 'bottom-right',
        effect: 'scale'
      }));
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => {
      return {
        teamInfo: { ...prevState.teamInfo, [name]: value }
      }
      
    }, () => console.log(this.state.teamInfo))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="selectTeam1">Team Name</label>
                <TextInput                  
                  id="inputTeamName"
                  name="name"
                  value={this.state.teamInfo.name.value}
                  placeholder={this.state.teamInfo.name.placeholder}
                  onChange = {this.changeHandler}/>
              </div>              
            </div>                        
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
    );
  }
}
