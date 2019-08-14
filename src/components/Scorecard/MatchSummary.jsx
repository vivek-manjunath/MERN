/** @format */

import React from 'react';

export default function MatchSummary(props) {
  return (
    <div>
      <form onSubmit={props.updateMatchSummary}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card bg-light border-radius-5px">
              <div className="card-header">Match summary</div>
              <div className="card-body result-summary-container">
                <div class="form-group row">
                  <label for="lblMatch" class="col-sm-4 col-form-label">
                    Match
                  </label>
                  <div class="col-sm-8">
                    <label id="lblMatch" className="col-form-label">
                      <strong>{props.matchData.awayTeamId.name}</strong>
                      <span>&nbsp;vs&nbsp;</span>
                      <strong>{props.matchData.homeTeamId.name}</strong>
                    </label>
                  </div>
                </div>

                <fieldset class="form-group">
                  <div class="row">
                    <legend class="col-form-label col-sm-4 pt-0">Toss won by</legend>
                    <div class="col-sm-8">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="tossWinningTeamId"
                          id="gridRadios1"
                          value={props.matchData.awayTeamId._id}
                          checked={props.matchData.awayTeamId._id == props.matchData.tossWinningTeamId}
                          onChange={props.handleChange}
                        />
                        <label class="form-check-label" for="gridRadios1">
                          {props.matchData.awayTeamId.name}
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="tossWinningTeamId"
                          id="gridRadios2"
                          value={props.matchData.homeTeamId._id}
                          checked={props.matchData.homeTeamId._id == props.matchData.tossWinningTeamId}
                          onChange={props.handleChange}
                        />
                        <label class="form-check-label" for="gridRadios2">
                          {props.matchData.homeTeamId.name}
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="form-group">
                  <div class="row">
                    <legend class="col-form-label col-sm-4 pt-0">Decision</legend>
                    <div class="col-sm-8">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="tossDecision"
                          id="gridRadioBat"
                          value="bat"
                          onChange={props.handleChange}
                          checked={props.matchData.tossDecision == 'bat'}
                        />
                        <label class="form-check-label" for="gridRadioBat">
                          Bat
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="tossDecision"
                          id="gridRadiosBowl"
                          value="bowl"
                          onChange={props.handleChange}
                          checked={props.matchData.tossDecision == 'bowl'}
                        />
                        <label class="form-check-label" for="gridRadiosBowl">
                          Bowl
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="form-group">
                  <div class="row">
                    <legend class="col-form-label col-sm-4 pt-0">Winning team</legend>
                    <div class="col-sm-8">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="winningTeamId"
                          id="gridWinningTeamAway"
                          value={props.matchData.awayTeamId._id}
                          checked={props.matchData.awayTeamId._id == props.matchData.winningTeamId}
                          onChange={props.handleChange}
                        />
                        <label class="form-check-label" for="gridWinningTeamAway">
                          {props.matchData.awayTeamId.name}
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="winningTeamId"
                          id="gridWinningTeamHome"
                          value={props.matchData.homeTeamId._id}
                          checked={props.matchData.homeTeamId._id == props.matchData.winningTeamId}
                          onChange={props.handleChange}
                        />
                        <label class="form-check-label" for="gridWinningTeamHome">
                          {props.matchData.homeTeamId.name}
                        </label>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <div>
                  <div class="form-group row">
                    <label for="lblMatch" class="col-sm-4 col-form-label">
                      <strong>{props.matchData.awayTeamId.name}</strong>
                    </label>
                    <div class="col-sm-4">
                      <label id="lblMatch" className="col-form-label">
                        <strong>
                          {props.matchData.scorecardId && props.matchData.scorecardId.firstInning && props.matchData.scorecardId.firstInning.battingScorecard.totalRunsScored}
                        </strong>
                      </label>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="lblMatch" class="col-sm-4 col-form-label">
                      <strong>{props.matchData.homeTeamId.name}</strong>
                    </label>
                    <div class="col-sm-4">
                      <label id="lblMatch" className="col-form-label">
                        <strong>
                          {props.matchData.scorecardId && props.matchData.scorecardId.secondInning && props.matchData.scorecardId.secondInning.battingScorecard.totalRunsScored}
                        </strong>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <button type="submit" className="btn btn-sm btn-success">
                  Update Match Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
