/** @format */

import React from 'react';

export default function Pool(props) {
  return (
    <div>
      <h5>{props.poolName}</h5>
      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Teams</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {props.participatingTeams &&
            props.participatingTeams.map(team => {
              return (
                <tr>
                  <td>{team.teamId.name}</td>
                  <td>x</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
