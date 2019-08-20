/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pools: [{type: String}],
  participatingTeams: [
    {
      teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
      },
      totalMatches: {type: Number},
      totalWins: {type: Number},
      totalTies: {type: Number},
      totalLosses: {type: Number},
      totalRunsScored: {type: Number},
      totalOversFaced: {type: Number},
      totalRunsAllowed: {type: Number},
      totalOversBowled: {type: Number},
      points: {type: Number},
      netRunRate: {type: Number},
      pool: {type: String},
    },
  ],
  isActive: {
    type: Boolean,
    required: true,
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

module.exports = mongoose.model('Tournament', tournamentSchema, 'Tournament');
