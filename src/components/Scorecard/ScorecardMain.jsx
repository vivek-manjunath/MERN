import React, { Component } from "react";
import BattingCard from "./BattingCard";
import BowlingCard from "./BowlingCard";
import API from "../../utils/API";

export default class ScorecardMain extends Component {
  constructor() {
    super();
    this.state = { scorecardData: {
      teamA: {
        teamId: {},
        battingScorecard: []
      }
    }
  };
  }

  componentDidMount() {
    API.getScorecard(this.props.match.params.scorecardId).then(res => {
      this.setState(
        { scorecardData: res.data },
        () => {
          console.log("Parent");
          console.log(this.state);
        }
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            {/* <BattingCard scorecardData = {this.state.battingScorecard}></BattingCard> */}
            <div>
              <div className="row">
                <div className="col-md-12">
                  <h5>{this.state.scorecardData.teamA.teamId.name}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-striped table-sm mb-1">
                    <thead>
                      <tr>
                        <th scope="col">Batsmen</th>
                        <th scope="col" />
                        <th scope="col">Runs</th>
                        <th scope="col">Balls</th>
                        <th scope="col">SR</th>
                        <th scope="col">4s</th>
                        <th scope="col">6s</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.scorecardData.teamA.battingScorecard.map(item => {
                        let playerFullName =
                          (item.playerId.firstName) ? item.playerId.firstName : '' +
                          " " +
                          (item.playerId.middleName) ? item.playerId.middleName : '' +
                          " " +
                          (item.playerId.lastName) ? item.playerId.lastName : '';

                        return (
                          <tr key={item.playerId._id}>
                            <th scope="row">{playerFullName}</th>
                            <td>{item.dismissal}</td>
                            <td>{item.runs}</td>
                            <td>{item.balls}</td>
                            <td>{item.strikeRate}</td>
                            <td>{item.numberOfFours}</td>
                            <td>{item.numberOfSixes}</td>
                          </tr>
                        );
                      })}
                      <tr className="table-dark">
                        <th scope="row">Total</th>
                        <td>(9 wickets; 16 overs)</td>
                        <td>98</td>
                        <td />
                        <td />
                        <td />
                        <td />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <BowlingCard />
          </div>
        </div>
      </div>
    );
  }
}
