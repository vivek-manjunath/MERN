const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  tournamentId: {
    type: Schema.Types.ObjectId,
    ref: "Tournament",
    required: true
  },
  homeTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },
  awayTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true
  },
  scorecardId: {
    type: Schema.Types.ObjectId,
    ref: "Scorecard",
    required: false
  },
  datePlayed: {
    type: Date
  },
  timePlayed: {
    type: String
  },
  venue: {
    type: String
  },
  umpiringTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  tossWinningTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  winningTeamId: {
    type: Schema.Types.ObjectId,
    ref: "Team"
  },
  manOfTheMatchPlayerId: {
    type: Schema.Types.ObjectId,
    ref: "Player"
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: "System"
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String,
    default: "System"
  }
});

module.exports = mongoose.model("Match", matchSchema, "Match");
