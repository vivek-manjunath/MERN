const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    captainId: {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },
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

module.exports = mongoose.model("Team", teamSchema, "Team");