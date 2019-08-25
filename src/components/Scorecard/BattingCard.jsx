/** @format */

import React, {Component} from 'react';
import PlayerLink from '../Player/PlayerLink';

export default function BattingCard({scoreCardData}) {
  return (
    <div>
      {scoreCardData && scoreCardData.battingTeamId && (
        <div className="row">
          <div className="col-md-12">
            <h4>
              <strong>{scoreCardData.battingTeamId.name}</strong>
            </h4>
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
              {scoreCardData &&
                scoreCardData.battingScorecard.batsmanList &&
                scoreCardData.battingScorecard.batsmanList.map(item => {
                  let dismissalText = item.dismissal ? item.fielder && 'c ' + item.fielder.fullName + ' b ' + item.bowler.fullName : 'not out';

                  return (
                    <tr key={item.playerId._id}>
                      <th scope="row">{<PlayerLink playerName={item.playerId.fullName} playerProfileUrl={`/PlayerProfile/${item.playerId._id}`} />}</th>
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
                    (scoreCardData && scoreCardData.extras && scoreCardData.extras.noBalls ? scoreCardData.extras.noBalls : 0) +
                    ', w ' +
                    (scoreCardData && scoreCardData.extras && scoreCardData.extras.wides ? scoreCardData.extras.wides : 0) +
                    ', b ' +
                    (scoreCardData && scoreCardData.extras && scoreCardData.extras.byes ? scoreCardData.extras.byes : 0)}
                </td>
                <td>{scoreCardData && scoreCardData.extras && scoreCardData.extras.totalExtras}</td>
                <td />
                <td />
                <td />
                <td />
              </tr>
              <tr className="bg-primary text-white">
                <th scope="row">Total</th>
                <td>
                  <span>
                    {'(' +
                      (scoreCardData && scoreCardData.battingScorecard && scoreCardData.battingScorecard.totalWicketsLost ? scoreCardData.battingScorecard.totalWicketsLost : 0) +
                      ' wickets; ' +
                      (scoreCardData && scoreCardData.bowlingScorecard && scoreCardData.bowlingScorecard.totalOversBowled ? scoreCardData.bowlingScorecard.totalOversBowled : 0) +
                      ' overs)'}
                  </span>
                </td>
                <td>
                  <strong>{scoreCardData && scoreCardData.battingScorecard && scoreCardData.battingScorecard.totalRunsScored}</strong>
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
