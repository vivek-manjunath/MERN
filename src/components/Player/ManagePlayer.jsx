import React, { Component } from "react";
import API from "../../utils/API";
import TextInput from "../Elements/TextInput";

export default class ManagePlayer extends Component {
  constructor() {
    super();
    this.state = { teams: [] ,
       playerInfo: {
         firstName: {
           value: '',
           placeholder: 'First Name'
         },
         middleName: '',
         lastName:''
       }
      };
  }
  componentDidMount() {
    API.getTeams()
      .then(res => this.setState({ teams: res.data }))
      .catch(err => console.log(err));
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => {
      return {
        playerInfo: { ...prevState.playerInfo, [name]: value }
      }
      
    }, () => console.log(this.state.playerInfo))
  }


  handleSubmit = (e) =>{
    
    e.preventDefault();
    this.setState((prevState) => {
      return {
        playerInfo: { ...prevState.playerInfo, isActive: true }
      }
      
    }, () => {
      API.savePlayer(this.state.playerInfo)
        .then(res => console.log('new player created'))
        .catch(err => console.log(err))
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="selectTeam1">First Name</label>
                <TextInput                  
                  id="inputFirstName"
                  name="firstName"
                  value={this.state.playerInfo.firstName.value}
                  placeholder={this.state.playerInfo.firstName.placeholder}
                  onChange = {this.changeHandler}/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="selectTeam1">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputMiddleName"
                  name="middleName"
                  placeholder="Middle Name"
                  onChange = {this.changeHandler}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputLasttName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLasttName"
                  name="lastName"
                  placeholder="Last Name"
                  onChange = {this.changeHandler}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputDate">DOB</label>
                <input
                  type="Date"
                  className="form-control"
                  id="inputDOB"
                  name="dob"
                  placeholder="Date"
                  onChange = {this.changeHandler}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="selectTeam">Team</label>
                <select id="selectTeam" 
                  className="form-control" 
                  name="team"                  
                  onChange = {this.changeHandler}
                  >
                  <option selected>Choose Team</option>
                  {this.state.teams.map(team => {
                    return (
                      <option id={"team_" + team._id} key={team._id} value={team._id}>
                        {team.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
