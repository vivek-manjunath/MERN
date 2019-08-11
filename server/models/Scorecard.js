const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema({
  firstInning: {
    battingTeamId: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    battingScorecard: {
      type: Schema.Types.ObjectId,
      ref: "BattingScorecard"
    },
    bowlingTeamId: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    bowlingScorecard: {
      type: Schema.Types.ObjectId,
      ref: "BowlingScorecard"
    }
  },
  secondInning: {
    battingTeamId: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    battingScorecard: {
      type: Schema.Types.ObjectId,
      ref: "BattingScorecard"
    },
    bowlingTeamId: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    bowlingScorecard: {
      type: Schema.Types.ObjectId,
      ref: "BowlingScorecard"
    }
  },

  isActive: {
    type: Boolean
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

module.exports = mongoose.model("Scorecard", scorecardSchema, "Scorecard");
