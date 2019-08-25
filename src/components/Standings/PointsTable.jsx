/** @format */

import React from 'react';

export default function PointsTable(props) {
  return (
    <div>
      <table class="table table-hover table-sm standings-table">
        <thead>
          <tr>
            <th scope="col">Teams</th>
            <th scope="col">Played</th>
            <th scope="col">Won</th>
            <th scope="col">Lost</th>
            <th scope="col">Tied</th>
            <th scope="col">N/R</th>
            <th scope="col">NRR</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {props.teams.map(team => {
            return (
              <tr>
                <td>{team.teamId.name}</td>
                <td>{team.totalMatches ? team.totalMatches : 0}</td>
                <td>{team.totalWins ? team.totalWins : 0}</td>
                <td>{team.totalLosses ? team.totalLosses : 0}</td>
                <td>0</td>
                <td>{team.noResults ? team.noResults : 0}</td>
                <td>0.00</td>
                <td>{team.points ? team.points : 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
