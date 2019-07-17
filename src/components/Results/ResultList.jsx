import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

const resultCardStyle = {
  marginBottom: "1rem"
}

export default class ResultList extends Component {
  constructor() {
    super();
    this.state = { matches: [] };
  }

  componentDidMount() {
    API.getMatches()
      .then(res => this.setState({ matches: res.data }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <div className="row success">
          <div className="col-md-12">
            {
              (this.state.matches) ?
              this.state.matches.map(match => {
              return (
                <div>
                  <div className="card" style={resultCardStyle}>
                    <div className="card-body">
                      <div class="row">
                        <div className="col-md-8">
                          <h2>
                          {match.homeTeamId.name}
                          </h2>
                        </div>
                        <div className="col-md-2">
                          <h2>
                            100/2                          
                          <small className="mb-2">
                            12/12
                          </small>
                          </h2>
                        </div>
                        <div className="col-md-2 text-center">
                          <Link href="#" to={`/Scorecard/${match.scorecardId}`} className="card-link">
                            Scorecard
                          </Link>
                        </div>                                                                                              
                      </div>
                      <div class="row text-muted">
                        <div className="col-md-8">
                          <h2>
                          {match.awayTeamId.name}
                          </h2>
                        </div>
                        <div className="col-md-2">
                          <h2>
                            90/2                          
                          <small className="">
                            12/12
                          </small>
                          </h2>
                        </div>                                                                                                                      
                      </div>
                      <h6 className="card-subtitle mb-2">
                        March 9th, Evans 1
                      </h6>
                      
                    </div>
                  </div>
                </div>
              );
            }) :
            <h5>Result data not available</h5>}
          </div>
        </div>
      </div>
    );
  }
}
