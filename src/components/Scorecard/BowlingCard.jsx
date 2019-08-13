/** @format */

import React from 'react';
import PlayerLink from '../Player/PlayerLink';

export default function BowlingCard(props) {
  return (
    <div>
      <table className="table table-striped table-sm tcl-table">
        <thead>
          <tr>
            <th scope="col">Bowler</th>
            <th scope="col">O</th>
            <th scope="col">R</th>
            <th scope="col">W</th>
            <th scope="col">Econ</th>
          </tr>
        </thead>
        <tbody>
          {props.scoreCardData.map(bowlerInfo => {
            return (
              <tr>
                <th scope="row">{<PlayerLink playerName={bowlerInfo.playerId.fullName} playerProfileUrl={`/PlayerProfile/${bowlerInfo.playerId._id}`} />}</th>
                <td>{bowlerInfo.overs}</td>
                <td>{bowlerInfo.runs}</td>
                <td>{bowlerInfo.wickets}</td>
                <td>{bowlerInfo.economy}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
