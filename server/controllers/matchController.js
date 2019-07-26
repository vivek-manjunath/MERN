const Match = require("../models/Match");
const Scorecard = require("../models/Scorecard");
const mongoose = require("mongoose");

module.exports = {
  findAll: function(req, res) {
    Match.find()
      .populate("homeTeamId")
      .populate("awayTeamId")
      .populate("tournamentId")
      .populate("umpiringTeamId")
      .populate("winningTeamId")
      .populate("scorecardId")
      .then(matches => res.json(matches))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("Find by id: " + req.params.id);
    Match.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate("homeTeamId")
      .populate("awayTeamId")
      .populate({
        path: "scorecardId",
        populate: { path: "teamA.battingScorecard.playerId" }
      })
      // .populate({ path: "scorecardId.teamA.battingScorecard.playerId" })
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
    Match.findOne(mongoose.Types.ObjectId(req.params.id), function(err, match) {
      if (err) res.status(422).json(err);
      match.winningTeamId = req.body.winningTeamId;
      if (!match.scorecardId) {
        Scorecard.create({}).then(newScorecard => {
          match.scorecardId = mongoose.Types.ObjectId(newScorecard._id);
          match.save(err => {
            if (err) res.status(422).json(err);
            match.populate("scorecardId", (err, match) => {
              res.status(200).json(match);
            });
          });
        });
      } else {
        match.save(err => {
          if (err) res.status(422).json(err);
          match.populate("scorecardId", (err, match) => {
            res.status(200).json(match);
          });
        });
      }
    });

    // if (req.body && req.body.scorecardId) {
    //   Scorecard.findByIdAndUpdate(
    //     mongoose.Types.ObjectId(req.params.id),
    //     req.body,
    //     { new: true }
    //   )
    //     .then(scorecard => {
    //       console.log("Scorecard updated: " + scorecard._id);

    //       Match.findByIdAndUpdate(
    //         mongoose.Types.ObjectId(req.params.id),
    //         {
    //           ...req.body,
    //           scorecardId: mongoose.Types.ObjectId(newScorecard._id),
    //           winningTeamId: mongoose.Types.ObjectId(req.body.winningTeamId)
    //         },
    //         { new: true }
    //       )
    //         .populate("homeTeamId")
    //         .populate("awayTeamId")
    //         .populate("winningTeamId")
    //         .populate("scorecardId")
    //         .then(match => {
    //           console.log("Match updated: " + req.params.id);
    //           res.json(match);
    //         })
    //         .catch(err => res.status(422).json(err));
    //     })
    //     .catch(err => console.log("Scorecard creation error: " + err));
    // } else {
    //   Scorecard.create(req.body.scoreCard)
    //     .then(newScorecard => {
    //       console.log("Scorecard created: " + newScorecard._id);

    //       Match.findByIdAndUpdate(
    //         mongoose.Types.ObjectId(req.params.id),
    //         {
    //           ...req.body,
    //           scorecardId: mongoose.Types.ObjectId(newScorecard._id),
    //           winningTeamId: mongoose.Types.ObjectId(req.body.winningTeamId)
    //         },
    //         { new: true }
    //       )
    //         .populate("homeTeamId")
    //         .populate("awayTeamId")
    //         .populate("winningTeamId")
    //         .populate("scorecardId")
    //         .then(match => {
    //           console.log("Match updated: " + req.params.id);
    //           res.json(match);
    //         })
    //         .catch(err => res.status(422).json(err));
    //     })
    //     .catch(err => console.log("Scorecard creation error: " + err));
    // }
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
