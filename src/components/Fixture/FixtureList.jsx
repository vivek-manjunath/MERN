import React, { Component } from 'react'
import API from "../../utils/API";
import { Link } from "react-router-dom";


export default class FixtureList extends Component {
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
        <table className="table table-sm">
            <thead>
                <tr className="table-primary">                
                    <th scope="col">Opponents</th>                    
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Venue</th>
                    <th scope="col">Umpiring Team</th>
                    <th scope="col">Scorecard</th>
                </tr>
            </thead>
            <tbody>
                {
                    (this.state.matches) ?
                    this.state.matches.map((match) => {
                        return(
                            <tr>                                
                                <td>
                                    <div className={"row font-weight-bold " + (match.homeTeamId._id === match.winningTeamId ? 'text-muted':'text-dark')}>
                                        <div className="col-md-9">                                            
                                            {match.homeTeamId.name}                                            
                                        </div>
                                        <div className="col-md-3">                                            
                                                100/2&nbsp;(16)                                                                                                                 
                                        </div>                                                                                                                                    
                                    </div> 
                                    <div className={"row font-weight-bold " + (match.awayTeamId._id === match.winningTeamId ? 'text-muted':'text-dark')}>
                                        <div className="col-md-9">
                                            <strong>
                                            {match.awayTeamId.name}
                                            </strong>
                                        </div>
                                        <div className="col-md-3">
                                            <strong>
                                                102/2&nbsp;(15.3)                                                                        
                                            </strong>
                                        </div>                                                                                                                                    
                                    </div> 
                                {/* <td>{match.awayTeamId.name}</td> */}
                                </td>
                                <td className="align-middle">04/11/2019</td>
                                <td className="align-middle">11:00 AM</td>
                                <td className="align-middle">Evans 1</td>
                                <td className="align-middle">Thunders</td>
                                <td className="align-middle">
                                    <Link href="#" to={`/Scorecard/${match.scorecardId}`} className="card-link">
                                        Scorecard
                                    </Link>
                                </td>
                            </tr>
                        )
                    }) : 
                    <h5>Fixture data not available</h5>
                }
                }                
            </tbody>
            </table>
      </div>
    )
  }
}
