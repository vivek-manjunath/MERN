/** @format */

const mongoose = require('mongoose');
const Scorecard = require('./Scorecard');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true,
  },
  homeTeamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  awayTeamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
  scorecardId: {
    type: Schema.Types.ObjectId,
    ref: 'Scorecard',
    required: false,
    // default: function() {
    //   return new Scorecard();
    // }
  },
  datePlayed: {
    type: Date,
  },
  timePlayed: {
    type: String,
  },
  venue: {
    type: String,
  },
  umpiringTeamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  tossWinningTeamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  tossDecision: {
    type: String,
  },
  winningTeamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  manOfTheMatchPlayerId: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    default: 'System',
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    default: 'System',
  },
});

// matchSchema.post('save', function(next) {
//   next();
// });

module.exports = mongoose.model('Match', matchSchema, 'Match');
