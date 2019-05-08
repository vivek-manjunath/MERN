import React, { Component } from "react";
import API from "../../utils/API";
import { Tabs, Tab, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

export default class AddScorecard extends Component {
  constructor() {
    super();
    this.state = {
      matchData: {
        homeTeamId: {},
        awayTeamId: {}
      },      
      battingScorecard: [{
          batsman:""
      }]
    };
  }

  componentDidMount() {
    API.getMatch(this.props.match.params.matchId).then(res => {
      this.setState({ matchData: res.data });
    });
  }

  addBatsman = () => {
      let newBatsMan = {};
      this.setState({battingScorecard: [...this.state.battingScorecard, newBatsMan]})      
  }
  render() {
    return (
      <div>
        <div>
          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Match
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  plaintext
                  readOnly
                  value={
                    this.state.matchData.awayTeamId.name +
                    " vs " +
                    this.state.matchData.homeTeamId.name
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Toss won by
              </Form.Label>
              <Col sm="10">
                <Form.Check
                  inline
                  label={this.state.matchData.awayTeamId.name}
                  type="radio"
                  id="rdoAwayTeam"
                />
                <Form.Check
                  inline
                  label={this.state.matchData.homeTeamId.name}
                  type="radio"
                  id="rdoHome"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Decision
              </Form.Label>
              <Col sm="10">
                <Form.Check
                  inline
                  label="Bat"
                  type="radio"
                  id="rdoDecisionBat"
                />
                <Form.Check
                  inline
                  label="Bowl"
                  type="radio"
                  id="rdoDecisionBowl"
                />
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div>
          <Tabs defaultActiveKey="firstInning" id="uncontrolled-tab-example">
            <Tab eventKey="firstInning" title="First Inning">
            <div className="row mb-2">
                  <div className="col-lg-12">
                  <h5>Batting</h5>
              <button className="btn btn-sm btn-success" onClick={this.addBatsman}>
                Add Batsman
              </button>
              <button className="btn btn-sm btn-success" onClick="">
                Add Extras
              </button>
                  </div>            
            </div>              
              <form action="">
                {this.state.battingScorecard.map(item => {
                  return (
                    <Form className="mb-2">
                    <Row>
                      <Col>
                      <Select
                      id="selTeam"
                      options={this.state.teamOptions}
                      name="teamId"
                      // value={this.state.teamValue}
                    />
                      </Col>
                      <Col>
                        <Form.Control placeholder="Runs" />
                      </Col>
                      <Col>
                        <Form.Control placeholder="Balls" />
                      </Col>
                      <Col>
                        <Form.Control placeholder="Fours" />
                      </Col>
                      <Col>
                        <Form.Control placeholder="Sixes" />
                      </Col>
                    </Row>
                  </Form>
                    
                  );
                })}
              </form>
            </Tab>
            <Tab eventKey="secondInning" title="Secong Inning">
              {/* <Sonnet /> */}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
