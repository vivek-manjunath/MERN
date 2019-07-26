const Scorecard = require("../models/Scorecard");
const Player = require("../models/Player");
const mongoose = require("mongoose");

module.exports = {
  findAll: function(req, res) {
    Scorecard.find()
      .then(Scorecards => res.json(Scorecards))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Scorecard.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate("teamA.battingScorecard.playerId")
      .populate("teamA.teamId")
      .exec((err, scorecard) => {
        if (err) res.status(422).json(err);
        res.json(scorecard);
      });
  },
  create: function(req, res) {
    Scorecard.create(req.body)
      .then(newScorecard => res.json(newScorecard))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Scorecard update called");

    Scorecard.findOne(
      mongoose.Types.ObjectId(req.params.id),
      (err, scorecard) => {
        scorecard.teamA = req.body.teamA;
        scorecard.teamA.teamTotal = 0;
        scorecard.teamA.battingScorecard.map(batsmanInfo => {
          scorecard.teamA.teamTotal += batsmanInfo.runs;
          if (batsmanInfo.runs && batsmanInfo.balls) {
            batsmanInfo.strikeRate =
              (batsmanInfo.runs / batsmanInfo.balls) * 100;
          }
          Player.findOne(
            mongoose.Types.ObjectId(batsmanInfo.playerId._id),
            (err, player) => {
              player.runsScored = player.runsScored || 0;
              player.runsScored += batsmanInfo.runs;
              player.save(err => {
                if (err) res.status(422).json(err);
              });
            }
          );
        });

        scorecard.save(err => {
          if (err) res.status(422).json(err);
          scorecard.populate(
            "teamA.battingScorecard.playerId",
            (err, scorecard) => {
              res.status(200).json(scorecard);
            }
          );
        });
      }
    );

    // Scorecard.findByIdAndUpdate(
    //   mongoose.Types.ObjectId(req.params.id),
    //   req.body,
    //   { new: true }
    // )
    //   .populate("teamA.battingScorecard.playerId")
    //   .then(Scorecard => res.json(Scorecard))
    //   .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Scorecard.findById({ ScorecardId: req.params.id })
      .then(Scorecard => Scorecard.remove())
      .then(allScorecards => res.json(allScorecards))
      .catch(err => res.status(422).json(err));
  }
};
