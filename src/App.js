import React, { Component } from 'react';

//import './assets/jquery.min.js';
//import '../node_modules/bootstrap/dist/css/bootstrap.css'
//import './assets/bootstrap.bundle.js'
//import './script.js';
//import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './theme.css';
import TopNavigation from './components/TopNavigation';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Tournaments from "./components/Tournaments";
import Teams from "./components/Team/Teams";
import TeamProfile from "./components/Team/TeamProfile";
import ResultsMain from './components/Results/ResultsMain';
import NewTeam from './components/Team/NewTeam';
import Stats from './components/Stats';
import About from './components/About';
import PlayerProfile from './components/Player/PlayerProfile';
import ManagePlayer from './components/Player/ManagePlayer';
import CreateFixture from './components/Fixture/CreateFixture';
import ScorecardMain from './components/Scorecard/ScorecardMain';
import TournamentMain from './components/Tournament/TournamentMain';
import Login from './components/Login';
import FixtureList from './components/Fixture/FixtureList';
import AddScorecard from './components/Scorecard/AddScorecard';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
              <TopNavigation></TopNavigation>
              <div className="container">
                <Route className="fade" exact path="/" component={Home} />
                <Route className="fade" path="/Home" component={Home} />
                <Route className="fade" path="/Results" component={ResultsMain} />
                <Route className="fade" path="/Stats" component={Stats} />
                <Route className="fade" path="/About" component={About} />
                <Route className="fade" path="/Tournaments" component={Tournaments} />
                <Route className="fade" exact path="/Teams" component={Teams} />
                <Route className="fade" exact path="/Teams/:id" component={TeamProfile} />
                <Route className="fade" exact path="/NewTeam" component={NewTeam} />
                <Route className="fade" exact path="/CreateFixture" component={CreateFixture} />
                <Route className="fade" exact path="/PlayerProfile/:playerId" component={PlayerProfile} />
                <Route className="fade" exact path="/ManagePlayer" component={ManagePlayer} />
                <Route className="fade" exact path="/Scorecard/:scorecardId" component={ScorecardMain} />    
                <Route className="fade" exact path="/AddScorecard/:matchId" component={AddScorecard} />      
                <Route className="fade" exact path="/Tournament" component={TournamentMain} />      
                <Route className="fade" exact path="/Login" component={Login} />
                <Route className="fade" exact path="/Fixtures" component={FixtureList} />                
              </div>                             
            </div>            
          </Router>
    );
  }
}


export default App;