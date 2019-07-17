import React, { Component } from "react";
import API from "../../utils/API";
import TextInput from "../Elements/TextInput";
import {Modal,Button} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
       },
       show: false
      };
  }
  componentDidMount() {
    API.getTeams()
      .then(res => this.setState({ teams: res.data }))
      .catch(err => console.log(err));
  }
  handleClose = (e) => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({ show: true });
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


  handleSave = (e) =>{
    
    e.preventDefault();
    this.setState((prevState) => {
      return {
        playerInfo: { ...prevState.playerInfo, isActive: true, team: this.props.teamId }
      }
      
    }, () => {
      API.savePlayer(this.state.playerInfo)
        .then(res => {
          this.handleClose(e);
          this.props.refreshSquad();
        })
        .catch(err => console.log(err))
    })
  }

  render() {
    return (      
      <>
        <Button className="btn btn-xs btn-success" onClick={this.handleShow}>
        <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>&nbsp;
          Add player
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Player</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="selectTeam1">First Name</label>
                <TextInput                  
                  id="inputFirstName"
                  name="firstName"
                  value={this.state.playerInfo.firstName.value}
                  placeholder={this.state.playerInfo.firstName.placeholder}
                  onChange = {this.changeHandler}/>
              </div>  
              </div>            
              <div className="form-row">
                <div className="form-group col-md-12">
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
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
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
                <div className="form-group col-md-12">
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
              </div>                                                           
          </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>

//       <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div class="modal-body">
      
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
      // <div className="card">
      //   <div className="card-body">
      //     <form onSubmit={this.handleSubmit}>
      //       <div className="form-row">
      //         <div className="form-group col-md-4">
      //           <label htmlFor="selectTeam1">First Name</label>
      //           <TextInput                  
      //             id="inputFirstName"
      //             name="firstName"
      //             value={this.state.playerInfo.firstName.value}
      //             placeholder={this.state.playerInfo.firstName.placeholder}
      //             onChange = {this.changeHandler}/>
      //         </div>
      //         <div className="form-group col-md-4">
      //           <label htmlFor="selectTeam1">Middle Name</label>
      //           <input
      //             type="text"
      //             className="form-control"
      //             id="inputMiddleName"
      //             name="middleName"
      //             placeholder="Middle Name"
      //             onChange = {this.changeHandler}
      //           />
      //         </div>
      //         <div className="form-group col-md-4">
      //           <label htmlFor="inputLasttName">Last Name</label>
      //           <input
      //             type="text"
      //             className="form-control"
      //             id="inputLasttName"
      //             name="lastName"
      //             placeholder="Last Name"
      //             onChange = {this.changeHandler}
      //           />
      //         </div>
      //       </div>

      //       <div className="form-row">
      //         <div className="form-group col-md-6">
      //           <label htmlFor="inputDate">DOB</label>
      //           <input
      //             type="Date"
      //             className="form-control"
      //             id="inputDOB"
      //             name="dob"
      //             placeholder="Date"
      //             onChange = {this.changeHandler}
      //           />
      //         </div>
      //         <div className="form-group col-md-6">
      //           <label htmlFor="selectTeam">Team</label>
      //           <select id="selectTeam" 
      //             className="form-control" 
      //             name="team"                  
      //             onChange = {this.changeHandler}
      //             >
      //             <option selected>Choose Team</option>
      //             {this.state.teams.map(team => {
      //               return (
      //                 <option id={"team_" + team._id} key={team._id} value={team._id}>
      //                   {team.name}
      //                 </option>
      //               );
      //             })}
      //           </select>
      //         </div>
      //       </div>
      //       <button type="submit" className="btn btn-success">
      //         Save
      //       </button>
      //     </form>
      //   </div>
      // </div>
    );
  }
}
