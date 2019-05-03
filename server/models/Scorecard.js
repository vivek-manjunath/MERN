const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema({
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

module.exports = mongoose.model("Scorecard", scorecardSchema, "Scorecard");
