import React, { Component } from "react";
import TopPlayers from "./TopPlayers";
import Footer from "./Footer";
import News from "./News";
import Sponsorers from "./Sponsorers";

const homeJumbotronStyle = {
  backgroundImage: 'url("assets/tcl_home.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

export default class Home extends Component {
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
          <div className="col-8 mb-2">
            <div className="row">
              <div className="col-12">
              <div class="jumbotron jumbotron-fluid">
                <div class="container">
                  <h1 class="display-4">Tampa Cricket League</h1>                  
                </div>
              </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-4 mb-2">
                    <TopPlayers title="Most Valuable Players" />
                  </div>
                  <div className="col-4 mb-2">
                    <TopPlayers title="Top Batsmen" />
                  </div>
                  <div className="col-4 mb-2">
                    <TopPlayers title="Top Bowlers" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 mb-2">
            <News title="Latest News" />
            <Sponsorers title="Sponsorers" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
