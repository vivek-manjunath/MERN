/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bowlingScorecardSchema = new Schema({
  bowlerList: [
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      overs: {
        type: Number,
      },
      maidens: {
        type: Number,
      },
      runs: {
        type: Number,
      },
      wickets: {
        type: Number,
      },
      economy: {
        type: Number,
      },
    },
  ],
  totalOversBowled: {
    type: Number,
  },
  isActive: {
    type: Boolean,
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

bowlingScorecardSchema.pre('save', function(next) {
  this.totalOversBowled = 0;
  this.bowlerList.map(bowlerInfo => {
    if (bowlerInfo.runs && bowlerInfo.overs) {
      bowlerInfo.economy = bowlerInfo.runs / bowlerInfo.overs;
      bowlerInfo.economy = bowlerInfo.economy.toFixed(2);
    }
    this.totalOversBowled += bowlerInfo.overs;
  });
  next();
});

module.exports = mongoose.model('BowlingScorecard', bowlingScorecardSchema, 'BowlingScorecard');
