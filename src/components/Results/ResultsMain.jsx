/** @format */

import React, {Component} from 'react';
import Filter from './Filter';
import ResultList from './ResultList';
import FixtureList from '../Fixture/FixtureList';
import API from '../../utils/API';
import Select from 'react-select';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import ErrorBoundary from '../ErrorBoundary';
import Matches from './Matches';

export default class ResultsMain extends Component {
  constructor() {
    super();
    this.state = {
      tournaments: [],
      teams: [],
      venues: [],
      matches: [],
      filterInfo: {},
      tournamentValue: {value: 'All', label: 'All'},
      teamValue: {value: 'All', label: 'All'},
      venueValue: {value: 'All', label: 'All'},
      showBlockUi: true,
    };
  }
  filterChangeHandler = (selectedOption, element) => {
    const name = element.name;
    const value = selectedOption.value;
    this.setState(
      prevState => {
        return {
          filterInfo: {...prevState.filterInfo, [name]: value},
        };
      },
      () => {
        API.filterMatches(this.state.filterInfo)
          .then(res => this.setState({matches: res.data, showBlockUi: false}))
          .catch(err => console.log(err));
      },
    );
  };
  componentDidMount() {
    API.getMatches()
      .then(res => this.setState({matches: res.data, showBlockUi: false}))
      .catch(err => console.log(err));

    API.getTournaments()
      .then(res => {
        let defaultOption = [{value: 'All', label: 'All'}];
        let tournamentLookupOptions = res.data.map(tournament => {
          return {value: tournament._id, label: tournament.name};
        });
        this.setState({
          tournamentOptions: defaultOption.concat(tournamentLookupOptions),
        });
      })
      .catch(err => console.log(err));

    API.getTeams()
      .then(res => {
        let defaultOption = [{value: 'All', label: 'All'}];
        let teamLookupOptions = res.data.map(team => {
          return {value: team._id, label: team.name};
        });
        this.setState({teamOptions: defaultOption.concat(teamLookupOptions)});
      })
      .catch(err => console.log(err));
  }

  clearFilters = e => {
    e.preventDefault();
    this.setState({
      tournamentValue: {value: 'All', label: 'All'},
      teamValue: {value: 'All', label: 'All'},
      venueValue: {value: 'All', label: 'All'},
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
                    <label htmlFor="selTournament">Tournament</label>
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
                    <button className="btn btn-sm btn-primary pull-right" onClick={this.clearFilters}>
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-10">
              <div>
                <Matches matches={this.state.matches} />
              </div>
            </div>

            {/* <ResultList /> */}
          </div>
        </BlockUi>
      </ErrorBoundary>
    );
  }
}
