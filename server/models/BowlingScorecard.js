const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bowlingScorecardSchema = new Schema({
  bowlerList: [
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: "Player"
      },
      overBowled: {
        type: Number
      },
      maidens: {
        type: Number
      },
      runs: {
        type: Number
      },
      wickets: {
        type: Number
      },
      economy: {
        type: Number
      }
    }
  ],
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

module.exports = mongoose.model(
  "BowlingScorecard",
  bowlingScorecardSchema,
  "BowlingScorecard"
);
