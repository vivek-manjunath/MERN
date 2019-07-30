/** @format */

import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/API';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const playerItemStyle = {
  width: '50%',
};

export default class TeamSquad extends Component {
  constructor(props) {
    super(props);
    this.state = {players: []};
  }

  componentDidMount() {
    this.getPlayersByTeam();
  }

  componentWillReceiveProps(props) {
    const {refresh} = this.props;
    if (props.refresh != refresh) {
      this.getPlayersByTeam();
    }
  }

  getPlayersByTeam = () => {
    API.getPlayersByTeam(this.props.teamId).then(res => {
      this.setState({players: res.data});
    });
  };

  deletePlayer = (id, e) => {
    e.preventDefault();
    API.deletePlayer(id).then(res => {
      this.getPlayersByTeam();
    });
  };

  render() {
    return (
      <div className="row">
        {this.state.players && this.state.players.length > 0 ? (
          this.state.players.map(player => {
            let playerFullName =
              player.firstName +
              ' ' +
              player.middleName +
              ' ' +
              player.lastName;

            return (
              <div className="col-sm-4">
                <div className="bd-callout bd-callout-info">
                  <div>
                    <h4>
                      <strong>{playerFullName}</strong>
                    </h4>
                  </div>

                  <div className="btn-group">
                    <Link
                      to={`/PlayerProfile/${player._id}`}
                      className="btn btn-xs btn-primary">
                      View Profile
                    </Link>
                    <button className="btn btn-xs btn-default">Edit</button>
                    <button
                      className="btn-danger btn btn-xs"
                      onClick={this.deletePlayer.bind(this, player._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h6>Squad not available</h6>
        )}
      </div>
    );
    // (this.state.players && this.state.players.length > 0) ?
    //   return (
    //     <div>
    //       {this.state.players.map(player => {
    //         let playerFullName =
    //           player.firstName +
    //           ' ' +
    //           player.middleName +
    //           ' ' +
    //           player.lastName;

    //         return <div>{playerFullName}</div>;
    //       })}
    //     </div>
    //   )
  }

  // render() {
  //   if (this.state.players && this.state.players.length > 0) {
  //     return (
  //       <div style={playerItemStyle} className="ibox-content">
  //         <Table hover className="table-condensed table-small" size="sm">
  //           <thead>
  //             <tr>
  //               <th>Name</th>
  //               <th />
  //               <th />
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {this.state.players.map(player => {
  //               let playerFullName =
  //                 player.firstName +
  //                 ' ' +
  //                 player.middleName +
  //                 ' ' +
  //                 player.lastName;
  //               return (
  //                 <tr>
  //                   <td>{playerFullName}</td>
  //                   <td>
  //                     <div className="btn-group">
  //                       <button className="btn btn-xs btn-primary">
  //                         View Profile
  //                       </button>
  //                       <button className="btn btn-xs btn-default">Edit</button>
  //                       <button
  //                         className="btn-danger btn btn-xs"
  //                         onClick={this.deletePlayer.bind(this, player._id)}>
  //                         Delete
  //                       </button>
  //                     </div>
  //                     {/* <Link to={`/PlayerProfile/${player._id}`}>
  //                       <small>View profile</small>
  //                     </Link> */}
  //                   </td>
  //                   {/* <td className="text-danger">
  //                     <a onClick={this.deletePlayer.bind(this, player._id)}>
  //                       <small>Delete</small>
  //                     </a>
  //                   </td> */}
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </Table>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <h6 className="text-muted">Squad information not available</h6>
  //       </div>
  //     );
  //   }
  // }
}
