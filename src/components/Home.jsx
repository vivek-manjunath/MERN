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
        <div className="row mb-3">
          <div className="col-sm-8 mb-2">
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
            <div className="row">
              <div className="col-sm-4">
                <div class="bs-callout bs-callout-primary">
                  <h4>225</h4>
                  Matches played
                </div>
              </div>
              <div className="col-sm-4">
                <div class="bs-callout bs-callout-primary">
                  <h4>2000</h4>
                  Runs scored
                </div>
              </div>
              <div className="col-sm-4">
                <div class="bs-callout bs-callout-primary">
                  <h4>225</h4>
                  Wickets taken
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
