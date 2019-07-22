const Match = require("../models/Match");
const mongoose = require("mongoose");

module.exports = {
  findAll: function(req, res) {
    Match.find()
      .populate("homeTeamId")
      .populate("awayTeamId")
      .populate("tournamentId")
      .populate("umpiringTeamId")
      .then(matches => res.json(matches))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log(req.params.id);
    Match.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate("homeTeamId")
      .populate("awayTeamId")
      .then(match => res.json(match))
      .catch(err => res.status(422).json(err));
  },
  filter: function(req, res) {
    const { tournamentId, teamId, venueId } = req.body;

    let filter = {};
    if (req.params) {
      if (tournamentId && tournamentId != "All")
        filter.tournamentId = mongoose.Types.ObjectId(tournamentId);
      if (teamId && teamId != "All") {
        filter.$or = [];
        filter.$or.push({ homeTeamId: mongoose.Types.ObjectId(teamId) });
        filter.$or.push({ awayTeamId: mongoose.Types.ObjectId(teamId) });
      }
      if (venueId && venueId != "All")
        filter.venueId = mongoose.Types.ObjectId(venueId);
    }
    Match.find(filter)
      .populate("homeTeamId")
      .populate("awayTeamId")
      .populate("tournamentId")
      .populate("umpiringTeamId")
      .then(matches => res.json(matches))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Match.create(req.body)
      .then(newMatch => res.json(newMatch))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Match.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body
    )
      .then(match => res.json(match))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Match.findById({
      _id: req.params.id
    })
      .then(match => match.remove())
      .then(allMatches => res.json(allMatches))
      .catch(err => res.status(422).json(err));
  }
};
