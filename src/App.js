import React, { Component } from 'react';

//import '../node_modules/jquery/dist/jquery';
//import '../node_modules/bootstrap/dist/css/bootstrap.css'
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
//import './script.js';
import './App.css';
import './theme.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Tournaments from "./components/Tournaments";
import Teams from "./components/Teams";
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
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
              <Navbar></Navbar>
              <main role="main" className="container">
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
                <Route className="fade" exact path="/Scorecard/:matchid" component={ScorecardMain} />      
                <Route className="fade" exact path="/Tournament" component={TournamentMain} />      
                <Route className="fade" exact path="/Login" component={Login} />
                <Route className="fade" exact path="/Fixtures" component={FixtureList} />                
              </main>                             
            </div>            
          </Router>
    );
  }
}


export default App;