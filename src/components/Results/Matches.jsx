/** @format */

import React from 'react';
import {Link} from 'react-router-dom';
import TeamName from '../Team/TeamName';
import DataNotAvailable from '../Common/DataNotAvailable';

export default function Matches(props) {
  return (
    <div>
      <table className="table table-sm tcl-table">
        <thead className="">
          <tr className="table-active">
            <th scope="col" className="text-left">
              Opponents
            </th>
            <th scope="col" className="text-center">
              Date
            </th>
            <th scope="col" className="text-center">
              Time
            </th>
            <th scope="col" className="text-center">
              Venue
            </th>
            <th scope="col" className="text-center">
              Umpiring Team
            </th>
            {props.hideScorecardCol !== true && (
              <th scope="col" className="text-center">
                Scorecard
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.matches && props.matches.length > 0 ? (
            props.matches.map(match => {
              const homeTeamName = match.homeTeamId ? match.homeTeamId.name : '';
              const awayTeamName = match.awayTeamId ? match.awayTeamId.name : '';
              const umpiringTeamName = match.umpiringTeamId ? match.umpiringTeamId.name : '';
              return (
                <tr key={match._id}>
                  <td>
                    <div
                      className={'row ' + (match.homeTeamId && match.winningTeamId && match.homeTeamId._id === match.winningTeamId ? 'text-dark font-weight-bold' : 'text-muted')}>
                      <div className="col-md-9">
                        <TeamName teamName={homeTeamName} teamProfileUrl={`teams/${match.homeTeamId._id}`} />
                      </div>
                      <div className="col-md-3">
                        <strong>{match.scorecardId && match.scorecardId.teamA && match.scorecardId.teamA.teamTotal}</strong>
                      </div>
                    </div>
                    <div
                      className={'row ' + (match.awayTeamId && match.winningTeamId && match.awayTeamId._id === match.winningTeamId ? 'text-dark font-weight-bold' : 'text-muted')}>
                      <div className="col-md-9">
                        <TeamName teamName={awayTeamName} teamProfileUrl={`/teams/${match.awayTeamId._id}`} />
                      </div>
                      <div className="col-md-3">
                        <strong>{match.scorecardId && match.scorecardId.teamB && match.scorecardId.teamB.teamTotal}</strong>
                      </div>
                    </div>
                    {/* <td>{match.awayTeamId.name}</td> */}
                  </td>
                  <td className="align-middle text-center">
                    <p>
                      <small>{match.datePlayed}</small>
                    </p>
                  </td>
                  <td className="align-middle text-center">
                    <p>
                      <small>{match.timePlayed}</small>
                    </p>
                  </td>
                  <td className="align-middle text-center">
                    <p>
                      <small>{match.venue}</small>
                    </p>
                  </td>
                  <td className="align-middle text-center">
                    <p>
                      <small>{umpiringTeamName}</small>
                    </p>
                  </td>
                  {props.hideScorecardCol !== true && (
                    <td className="align-middle text-center">
                      <p>
                        {match.scorecardId && (
                          <Link href="#" to={`/Scorecard/${match.scorecardId._id}`} className="card-link text-info">
                            View
                          </Link>
                        )}
                        <Link href="#" to={`/UpdateScorecard/${match._id}`} className="card-link text-info">
                          Update
                        </Link>
                      </p>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <DataNotAvailable />
          )}
        </tbody>
      </table>
    </div>
  );
}
