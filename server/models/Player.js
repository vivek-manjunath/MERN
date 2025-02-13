/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fullName: {
    type: String,
  },
  dob: {
    type: Date,
  },
  teamsPlayedFor: [
    {
      _id: {type: Schema.Types.ObjectId, ref: 'Team'},
      isActiveMember: Boolean,
    },
  ],
  runsScored: {
    type: Number,
  },
  wicketsTaken: {
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

//Post middleware
playerSchema.post('find', players => {
  players.map(player => {
    player.fullName = player.firstName + ' ' + player.lastName;
  });
});

module.exports = mongoose.model('Player', playerSchema, 'Player');
