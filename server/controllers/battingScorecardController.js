/** @format */

const BattingScorecard = require('../models/BattingScorecard');
const mongoose = require('mongoose');
const Player = require('../models/Player');

module.exports = {
  findAll: function(req, res) {
    BattingScorecard.find({isActive: true})
      .then(BattingScorecards => res.json(BattingScorecards))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    BattingScorecard.findById(mongoose.Types.ObjectId(req.params.id))
      // .populate("captainId")
      .then(battingScorecard => res.json(battingScorecard))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    BattingScorecard.create(req.body)
      .then(newBattingScorecard => res.json(newBattingScorecard))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    BattingScorecard.findOneAndUpdate(req.params.id, req.body, {upsert: true})
      .then(battingScorecard => res.json(battingScorecard))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    BattingScorecard.findById(mongoose.Types.ObjectId(req.params.id))
      .then(team => {
        team.remove();
      })
      .catch(err => res.status(422).json(err));
  },
  addBatsmanInfo: function(req, res) {
    console.log('id: ' + req.params.battingScorecardId);
    BattingScorecard.findById(mongoose.Types.ObjectId(req.params.battingScorecardId), function(err, battingScorecard) {
      if (err) res.status(422).json(err);
      battingScorecard.batsmanList = [...battingScorecard.batsmanList, req.body];
      battingScorecard.save(err => {
        if (err) res.status(422).json(err);
        battingScorecard.batsmanList.map(batsmanInfo => {
          // Update player profile
          Player.findOne(mongoose.Types.ObjectId(batsmanInfo.playerId._id), (err, player) => {
            player.runsScored = player.runsScored || 0;
            player.runsScored += batsmanInfo.runs;
            player.save(err => {
              if (err) res.status(422).json(err);
            });
          });
        });
        res.status(200).json(battingScorecard);
      });
    });
  },
};
