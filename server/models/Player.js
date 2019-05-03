const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date
  },
  teamsPlayedFor: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'Team' }
    ,    
    isActiveMember: Boolean
    }
  ],
  isActive: {
    type: Boolean,
    required: true
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

playerSchema.methods.getFullName = () => {
  return this.firstName + " " + this.middleName + " " + this.lastName;
};

module.exports = mongoose.model("Player", playerSchema, "Player");
