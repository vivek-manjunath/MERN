/** @format */

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import TextInput from '../Elements/TextInput';

export default class BowlerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {batsmanInfo: {}};
  }
  handleClose = e => {
    this.setState({show: false});
  };

  handleShow = e => {
    this.setState({show: true});
  };

  changeHandler = e => {
    const {name, value} = e.target;

    this.setState(
      prevState => {
        return {
          bowlerInfo: {...prevState.bowlerInfo, [name]: value},
        };
      },
      () => console.log(this.state.bowlerInfo),
    );
  };

  saveClick = () => {
    this.props.addBowlerClickHandler(this.state.bowlerInfo);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <button className="btn btn-xs btn-outline-success" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faPlusCircle} />
          &nbsp; Add Bowler
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Bowler</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="selBatsman">Bowler</label>
                  <select name="playerId" className="form-control" onChange={this.changeHandler}>
                    <option>Choose</option>
                    {this.props.homeTeamPlayersLookup &&
                      this.props.homeTeamPlayersLookup.map(player => {
                        return (
                          <option value={player._id}>
                            {player.firstName}&nbsp;{player.lastName}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipRuns">Runs</label>
                  <input type="text" className="form-control" id="ipRuns" name="runs" placeholder="Runs" onChange={this.changeHandler} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipOversBowled">Overs Bowled</label>
                  <input type="text" className="form-control" id="ipOversBowled" name="oversBowled" placeholder="Overs Bowled" onChange={this.changeHandler} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipWickets">Wickets</label>
                  <input type="text" className="form-control" id="ipWickets" name="wickets" placeholder="Wickets" onChange={this.changeHandler} />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
