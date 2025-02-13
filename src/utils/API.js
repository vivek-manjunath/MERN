/** @format */

import axios from 'axios';

export default {
  /*Team API methods*/
  getTeams: function() {
    return axios.get('/api/teams');
  },
  getTeam: function(id) {
    return axios.get('/api/teams/' + id);
  },
  deleteTeam: function(id) {
    return axios.delete('/api/teams/' + id);
  },
  saveTeam: function(teamData) {
    return axios.post('/api/teams', teamData);
  },
  /*Player API methods*/
  getPlayers: function() {
    return axios.get('/api/players');
  },
  getPlayersByTeam: function(id) {
    return axios.get('/api/players/getPlayersByTeam/' + id);
  },
  getPlayer: function(id) {
    return axios.get('/api/players/' + id);
  },
  deletePlayer: function(id) {
    return axios.delete('/api/players/' + id);
  },
  savePlayer: function(playerData) {
    return axios.post('/api/players', playerData);
  },
  getTopBatsmen: function() {
    return axios.get('/api/players/getTopBatsmen');
  },
  getTopBowlers: function() {
    return axios.get('/api/players/getTopBowlers');
  },
  /*Tournament API methods*/
  getTournaments: function() {
    return axios.get('/api/tournaments');
  },
  getTournament: function(id) {
    return axios.get('/api/tournaments/' + id);
  },
  deleteTournament: function(id) {
    return axios.delete('/api/tournaments/' + id);
  },
  saveTournament: function(tournamentData) {
    return axios.post('/api/tournaments', tournamentData);
  },
  updateTournament: function(id, tournamentData) {
    return axios.put('/api/tournaments/' + id, tournamentData);
  },

  /*Match API methods*/
  getMatches: function() {
    return axios.get('/api/matches');
  },
  getMatch: function(id) {
    return axios.get('/api/matches/' + id);
  },
  deleteMatch: function(id) {
    return axios.delete('/api/matches/' + id);
  },
  saveMatch: function(matchData) {
    return axios.post('/api/matches', matchData);
  },
  updateMatch: function(id, matchData) {
    return axios.put('/api/matches/' + id, matchData);
  },
  filterMatches: function(filterInfo) {
    return axios.post('/api/matches/filter', filterInfo);
  },

  /*Scorecard API methods*/
  getScorecards: function() {
    return axios.get('/api/scorecards');
  },
  getScorecard: function(id) {
    return axios.get('/api/scorecards/' + id);
  },
  deleteScorecard: function(id) {
    return axios.delete('/api/scorecards/' + id);
  },
  createScorecard: function(scorecardData) {
    return axios.post('/api/scorecards', scorecardData);
  },
  updateScorecard: function(id, scorecardData) {
    return axios.put('/api/scorecards/' + id, scorecardData);
  },
  addBattingScorecard: function(id) {
    return axios.put('/api/scorecards/addBattingScorecard/' + id);
  },

  /*Batting scorecard API methods*/
  getBattingScorecard: function(id) {
    return axios.get('/api/battingScorecard/' + id);
  },
  deleteBattingScorecard: function(id) {
    return axios.delete('/api/battingScorecard/' + id);
  },
  createBattingScorecard: function(battingScorecardData) {
    return axios.post('/api/battingScorecard', battingScorecardData);
  },
  updateBattingScorecard: function(id, battingScorecardData) {
    return axios.put('/api/battingScorecard/' + id, battingScorecardData);
  },
  addBatsmanInfo: function(battingScorecardId, batsmanInfo) {
    return axios.put('/api/battingScorecard/addBatsmanInfo/' + battingScorecardId, batsmanInfo);
  },

  /*Bowling scorecard API methods*/
  addBowlerInfo: function(bowlingScorecardId, bowlerInfo) {
    return axios.put('/api/bowlingScorecard/addBowlerInfo/' + bowlingScorecardId, bowlerInfo);
  },
  // filterMatches: function (filterInfo) {
  //     return axios.post('/api/matches/filter', filterInfo);
  // },

  /*Authentication methods*/
  register: function(userData) {
    return axios.post('/api/auth/register', userData);
  },
  login: function(email, password) {
    return axios.post('/api/auth/login', {email, password});
  },
};
