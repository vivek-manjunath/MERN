/** @format */

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import TextInput from '../Elements/TextInput';

export default class BatsmanInfo extends Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      playerInfo: {
        firstName: {
          value: '',
          placeholder: 'First Name',
        },
        middleName: '',
        lastName: '',
      },
      show: false,
    };
  }
  handleClose = e => {
    this.setState({show: false});
  };

  handleShow = e => {
    this.setState({show: true});
  };

  render() {
    return (
      <div>
        <Button className="btn btn-xs btn-success" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faPlusCircle} />
          &nbsp; Add batsman
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Batsman</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="selBatsman">Batsman</label>
                  <TextInput
                    id="selBatsman"
                    name="firstName"
                    value={this.state.playerInfo.firstName.value}
                    placeholder={this.state.playerInfo.firstName.placeholder}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipRuns">Runs</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ipRuns"
                    name="middleName"
                    placeholder="Runs"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipBalls">Balls</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ipBalls"
                    name="balls"
                    placeholder="Balls"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipFours">4s</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ipFours"
                    name="fours"
                    placeholder="Fours"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipSixes">6s</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ipSixes"
                    name="sixes"
                    placeholder="Sixes"
                    onChange={this.changeHandler}
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
      </div>
    );
  }
}
