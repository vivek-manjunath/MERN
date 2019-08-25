/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const battingScorecardSchema = new Schema({
  batsmanList: [
    {
      playerId: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      dismissal: {
        type: String,
      },
      fielder: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      bowler: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
      runs: {
        type: Number,
      },
      balls: {
        type: Number,
      },
      strikeRate: {
        type: Number,
      },
      numberOfFours: {
        type: Number,
      },
      numberOfSixes: {
        type: Number,
      },
    },
  ],
  extras: {
    wides: {
      type: Number,
    },
    noBalls: {
      type: Number,
    },
    byes: {
      type: Number,
    },
    totalExtras: {
      type: Number,
    },
  },
  totalRunsScored: {
    type: Number,
  },
  totalWicketsLost: {type: Number},
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

battingScorecardSchema.pre('save', function(next) {
  this.totalRunsScored = 0;
  this.totalWicketsLost = 0;
  this.batsmanList.map(batsmanInfo => {
    this.totalRunsScored += batsmanInfo.runs;
    this.totalWicketsLost += batsmanInfo.dismissal ? 1 : 0;
    if (batsmanInfo.runs && batsmanInfo.balls) {
      batsmanInfo.strikeRate = (batsmanInfo.runs / batsmanInfo.balls) * 100;
      batsmanInfo.strikeRate = batsmanInfo.strikeRate.toFixed(2);
    }
  });
  next();
});

module.exports = mongoose.model('BattingScorecard', battingScorecardSchema, 'BattingScorecard');
