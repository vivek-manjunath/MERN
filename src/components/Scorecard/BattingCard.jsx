/** @format */

import React, {Component} from 'react';
import PlayerLink from '../Player/PlayerLink';

export default function BattingCard({scoreCardData}) {
  return (
    <div>
      {scoreCardData.teamId && (
        <div className="row">
          <div className="col-md-12">
            <h4>{scoreCardData.teamId.name}</h4>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-sm mb-2 scorecard-table tcl-table">
            <thead>
              <tr>
                <th scope="col">Batsmen</th>
                <th scope="col" />
                <th scope="col">Runs</th>
                <th scope="col">Balls</th>
                <th scope="col">SR</th>
                <th scope="col">4s</th>
                <th scope="col">6s</th>
              </tr>
            </thead>
            <tbody>
              {scoreCardData.battingScorecard.map(item => {
                // let playerFullName = item.playerId.firstName
                //   ? item.playerId.firstName
                //   : '' + ' ' + item.playerId.middleName
                //   ? item.playerId.middleName
                //   : '' + ' ' + item.playerId.lastName
                //   ? item.playerId.lastName
                //   : '';

                // let dismissalText = 'not out';
                // switch (item.dismissal) {
                //   case 'Caught':
                //     dismissalText =
                //       'c ' + item.fielder &&
                //       item.fielder.firstName + ' b ' + item.bowler &&
                //       item.bowler.firstName;
                //     return;
                //   case 'Bowled':
                //     dismissalText = 'b ' + item.bowler && item.bowler.firstName;
                //     return;
                // }

                let dismissalText = item.dismissal
                  ? item.fielder &&
                    'c ' +
                      item.fielder.firstName +
                      ' b ' +
                      item.bowler.firstName
                  : 'not out';

                return (
                  <tr key={item.playerId._id}>
                    <th scope="row">
                      {
                        <PlayerLink
                          playerName={item.playerId.fullName}
                          playerProfileUrl={`/PlayerProfile/${
                            item.playerId._id
                          }`}
                        />
                      }
                    </th>
                    <td>{dismissalText}</td>
                    <td>{item.runs}</td>
                    <td>{item.balls}</td>
                    <td>{item.strikeRate}</td>
                    <td>{item.numberOfFours}</td>
                    <td>{item.numberOfSixes}</td>
                  </tr>
                );
              })}
              <tr className="bg-grey">
                <th scope="row">EXTRAS</th>
                <td>
                  {'nb ' +
                    (scoreCardData.extras && scoreCardData.extras.noBalls
                      ? scoreCardData.extras.noBalls
                      : 0) +
                    ', w ' +
                    (scoreCardData.extras && scoreCardData.extras.wides
                      ? scoreCardData.extras.wides
                      : 0) +
                    ', b ' +
                    (scoreCardData.extras && scoreCardData.extras.byes
                      ? scoreCardData.extras.byes
                      : 0)}
                </td>
                <td>
                  {scoreCardData.extras && scoreCardData.extras.totalExtras}
                </td>
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr className="bg-primary text-white">
                <th scope="row">Total</th>
                <td>(9 wickets; 16 overs)</td>
                <td>
                  <strong>{scoreCardData.teamTotal}</strong>
                </td>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
