/** @format */

import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import TextInput from '../Elements/TextInput';

export default class Extras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      extraData: this.props.extraData,
    };
  }
  handleClose = e => {
    this.setState({show: false});
  };

  handleShow = e => {
    this.setState({show: true});
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(
      prevState => {
        return {
          extraData: {...prevState.extraData, [name]: value},
        };
      },
      () => console.log(this.state.extraData),
    );
  };

  saveClick = () => {
    this.props.addExtrasClickHanlder(this.state.extraData);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <button className="btn btn-xs btn-outline-success" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faPlusCircle} />
          &nbsp; Add extras
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Extras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipWides">Wides</label>
                  <input
                    type="number"
                    className="form-control"
                    id="ipWides"
                    name="wides"
                    onChange={this.changeHandler}
                    value={this.state.extraData ? this.state.extraData.wides : 0}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipNoBalls">No balls</label>
                  <input
                    type="number"
                    className="form-control"
                    id="ipNoBalls"
                    name="noBalls"
                    value={this.state.extraData ? this.state.extraData.noBalls : 0}
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label for="ipByes">Byes</label>
                  <input
                    type="number"
                    className="form-control"
                    id="ipByes"
                    name="byes"
                    value={this.state.extraData ? this.state.extraData.byes : 0}
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
            <Button variant="primary" onClick={this.saveClick}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
