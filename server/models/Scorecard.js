const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema({
  teamA: {
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    battingScorecard: [
      {
        playerId: {
          type: Schema.Types.ObjectId,
          ref: "Player"
        },
        dismissal: {
          type: String
        },
        runs: {
          type: Number
        },
        balls: {
          type: Number
        },
        strikeRate: {
          type: Number
        },
        numberOfFours: {
          type: Number
        },
        numberOfSixes: {
          type: Number
        }
      }
    ],
    teamTotal: { type: Number }
    // bowlingScorecardId: {type
    // }
  },
  // teamB: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Team'
  // },
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
