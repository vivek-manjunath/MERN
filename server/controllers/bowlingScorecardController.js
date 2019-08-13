/** @format */

const BowlingScorecard = require('../models/BowlingScorecard');
const mongoose = require('mongoose');
const Player = require('../models/Player');

module.exports = {
  findAll: function(req, res) {
    BowlingScorecard.find({isActive: true})
      .then(BowlingScorecards => res.json(BowlingScorecards))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    BowlingScorecard.findById(mongoose.Types.ObjectId(req.params.id))
      // .populate("captainId")
      .then(BowlingScorecard => res.json(BowlingScorecard))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    BowlingScorecard.create(req.body)
      .then(newBowlingScorecard => res.json(newBowlingScorecard))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    BowlingScorecard.findOneAndUpdate(req.params.id, req.body, {upsert: true})
      .then(BowlingScorecard => res.json(BowlingScorecard))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    BowlingScorecard.findById(mongoose.Types.ObjectId(req.params.id))
      .then(team => {
        team.remove();
      })
      .catch(err => res.status(422).json(err));
  },
  addBowlerInfo: function(req, res) {
    console.log('id: ' + req.params.bowlingScorecardId);
    BowlingScorecard.findById(mongoose.Types.ObjectId(req.params.bowlingScorecardId), function(err, bowlingScorecard) {
      if (err) res.status(422).json(err);
      bowlingScorecard.bowlerList = [...bowlingScorecard.bowlerList, req.body];
      bowlingScorecard.save(err => {
        if (err) res.status(422).json(err);
        bowlingScorecard.bowlerList.map(bowlerInfo => {
          // Update player profile
          Player.findOne(mongoose.Types.ObjectId(bowlerInfo.playerId._id), (err, player) => {
            player.wicketsTaken = player.wicketsTaken || 0;
            player.wicketsTaken += bowlerInfo.wickets;
            player.save(err => {
              if (err) res.status(422).json(err);
            });
          });
        });
        res.status(200).json(bowlingScorecard);
      });
    });
  },
};
