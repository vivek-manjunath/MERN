import React, { Component } from "react";
import TopPlayers from "./TopPlayers";
import Footer from "./Footer";

const homeJumbotronStyle = {  
    backgroundImage: 'url("assets/tcl_home.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid" style={homeJumbotronStyle}>
          <div className="container text-center text-white">            
            <h1 className="display-4">Tampa Cricket League</h1>
            <p className="lead">Home of cricket in Tampa Bay area.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4">
            <TopPlayers title="Most Valuable Players" />
          </div>
          <div className="col-12 col-xl-4">
            <TopPlayers title="Top Batsmen" />
          </div>
          <div className="col-12 col-xl-4">
            <TopPlayers title="Top Bowlers" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
