/** @format */

import React, {Component} from 'react';
import TopPlayers from './TopPlayers';
import Footer from './Footer';
import News from './News';
import Sponsorers from './Sponsorers';
import API from '../utils/API';

const homeJumbotronStyle = {
  backgroundImage: 'url("assets/tcl_home.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    API.getTopBatsmen().then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          topBatsmen: res.data,
        };
      });
    });
    API.getTopBowlers().then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          topBowlers: res.data,
        };
      });
    });
  }

  render() {
    return (
      <div>
        <div class="cover">
          <div class="overlay"></div>
          <div class="content text-center">
            <h1>Tampa Cricket League</h1>
            <p>Home of cricket in Tampa Bay area</p>
          </div>
        </div>

        <div class="text-center">
          <div class="numbers d-flex flex-md-row flex-wrap justify-content-center">
            <div class="rect">
              <h1>2345</h1>
              <p>Total Matches</p>
            </div>
            <div class="rect">
              <h1>6784</h1>
              <p>Runs Scored</p>
            </div>
            <div class="rect">
              <h1>1056</h1>
              <p>Wickets Taken</p>
            </div>
          </div>
        </div>
        <div className="section row mb-3">
          <div className="col-sm-8 mb-2">
            <div className="row"></div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-sm-4 mb-2">
                    <TopPlayers statType="topThreeBatsmen" title="Most Valuable Players" players={this.state.topBatsmen} />
                  </div>
                  <div className="col-sm-4 mb-2">
                    <TopPlayers statType="topThreeBatsmen" players={this.state.topBatsmen} title="Top Batsmen" />
                  </div>
                  <div className="col-sm-4 mb-2">
                    <TopPlayers statType="topThreeBowlers" players={this.state.topBowlers} title="Top Bowlers" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <News title="Latest News" />
            <Sponsorers title="Sponsorers" />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
