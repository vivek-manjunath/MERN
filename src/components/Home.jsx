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
        {/* <div className="jumbotron jumbotron-fluid" style={homeJumbotronStyle}>
          <div className="container text-center text-white">            
            <h1 className="display-4">Tampa Cricket League</h1>
            <p className="lead">Home of cricket in Tampa Bay area.</p>
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-8 mb-2">
            <div className="row">
              <div className="col-sm-12" />
            </div>
            <div className="row">
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
              <div className="col-sm-12">
                <Sponsorers title="Sponsorers" />
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-2">
            <News title="Latest News" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
