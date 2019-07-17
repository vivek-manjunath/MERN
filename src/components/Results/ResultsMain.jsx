import React, { Component } from "react";
import Filter from "./Filter";
import ResultList from "./ResultList";
import FixtureList from "../Fixture/FixtureList";
import API from "../../utils/API";
import Select from "react-select";
import { Link } from "react-router-dom";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import TeamName from "../Team/TeamName";
import ErrorBoundary from "../ErrorBoundary";

export default class ResultsMain extends Component {
  constructor() {
    super();
    this.state = {
      tournaments: [],
      teams: [],
      venues: [],
      matches: [],
      filterInfo: {},
      tournamentValue: { value: "All", label: "All" },
      teamValue: { value: "All", label: "All" },
      venueValue: { value: "All", label: "All" },
      showBlockUi: true
    };
  }
  filterChangeHandler = (selectedOption, element) => {
    const name = element.name;
    const value = selectedOption.value;
    this.setState(
      prevState => {
        return {
          filterInfo: { ...prevState.filterInfo, [name]: value }
        };
      },
      () => {
        API.filterMatches(this.state.filterInfo)
          .then(res => this.setState({ matches: res.data, showBlockUi: false }))
          .catch(err => console.log(err));
      }
    );
  };
  componentDidMount() {
    API.getMatches()
      .then(res => this.setState({ matches: res.data, showBlockUi: false }))
      .catch(err => console.log(err));

    API.getTournaments()
      .then(res => {
        let defaultOption = [{ value: "All", label: "All" }];
        let tournamentLookupOptions = res.data.map(tournament => {
          return { value: tournament._id, label: tournament.name };
        });
        this.setState({
          tournamentOptions: defaultOption.concat(tournamentLookupOptions)
        });
      })
      .catch(err => console.log(err));

    API.getTeams()
      .then(res => {
        let defaultOption = [{ value: "All", label: "All" }];
        let teamLookupOptions = res.data.map(team => {
          return { value: team._id, label: team.name };
        });
        this.setState({ teamOptions: defaultOption.concat(teamLookupOptions) });
      })
      .catch(err => console.log(err));
  }

  clearFilters = e => {
    e.preventDefault();
    this.setState({
      tournamentValue: { value: "All", label: "All" },
      teamValue: { value: "All", label: "All" },
      venueValue: { value: "All", label: "All" }
    });
  };
  render() {
    return (
      <ErrorBoundary>
      <BlockUi tag="div" blocking={this.state.showBlockUi}>
        <div className="row">
          <div className="col-md-2 right-vertical-line">
            <div>
              <form action="">
                <div className="form-group">
                  <label htmlFor="selTournament">Tournament-{this.state.showBlockUi}</label>
                  <Select
                    id="selTournament"
                    name="tournamentId"
                    onChange={this.filterChangeHandler}
                    options={this.state.tournamentOptions}
                    // value={this.state.tournamentValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="selTeam">Team</label>
                  <Select
                    id="selTeam"
                    options={this.state.teamOptions}
                    name="teamId"
                    onChange={this.filterChangeHandler}
                    // value={this.state.teamValue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="selVenue">Venue</label>
                  <Select
                    id="selVenue"
                    options={this.state.venueOptions}
                    // value={this.state.venueValue}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-sm btn-primary pull-right"
                    onClick={this.clearFilters}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-10">
            <div>
              <table className="table table-sm">
                <thead className="">
                  <tr className="table-active">
                    <th scope="col" className="text-left">
                      Opponents
                    </th>
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Time
                    </th>
                    <th scope="col" className="text-center">
                      Venue
                    </th>
                    <th scope="col" className="text-center">
                      Umpiring Team
                    </th>
                    <th scope="col" className="text-center">
                      Scorecard
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (this.state.matches && this.state.matches.length > 0) ? 
                    this.state.matches.map(match => {
                      const homeTeamName = match.homeTeamId ? match.homeTeamId.name : 'Unkown';
                      const awayTeamName = match.awayTeamId ? match.awayTeamId.name : 'Unkown';
                    return (
                      <tr key={match._id}>
                        <td>
                          <div
                            className={
                              "row font-weight-bold " +
                              (match.homeTeamId._id === match.winningTeamId
                                ? "text-muted"
                                : "text-dark")
                            }
                          >
                            <div className="col-md-9">
                                <TeamName teamName={homeTeamName} teamProfileUrl={`teams/${match.homeTeamId._id}`}></TeamName>                                                            
                            </div>
                            <div className="col-md-3">100/2&nbsp;(16)</div>
                          </div>
                          <div
                            className={
                              "row font-weight-bold " +
                              (match.awayTeamId._id === match.winningTeamId
                                ? "text-muted"
                                : "text-dark")
                            }
                          >
                            <div className="col-md-9">
                            <TeamName teamName={awayTeamName} teamProfileUrl={`/teams/${match.awayTeamId._id}`}></TeamName>                                                            
                            </div>
                            <div className="col-md-3">
                              <strong>102/2&nbsp;(15.3)</strong>
                            </div>
                          </div>
                          {/* <td>{match.awayTeamId.name}</td> */}
                        </td>
                        <td className="align-middle text-center">
                          <p>
                            <small>04/11/2019</small>
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          <p>
                            <small>{match.timePlayed}</small>
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          <p>
                            <small>{match.venue}</small>
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          <p>
                            <small>Thunders</small>
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          <p>       
                            {
                              (match.scorecardId) ? (
                                                
                              <Link
                                href="#"
                                to={`/Scorecard/${match.scorecardId}`}
                                className="card-link text-info"
                              >
                                Scorecard
                              </Link>   
                              ) : (
                                <Link
                                href="#"
                                to={`/AddScorecard/${match._id}`}
                                className="card-link text-info"
                              >
                                Add
                              </Link>
                              )
                            }                         
                          </p>
                        </td>
                      </tr>
                    );
                  }) : 
                  <h5>Result data not available</h5>
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* <ResultList /> */}
        </div>
      </BlockUi>
      </ErrorBoundary>      
    );
  }
}
