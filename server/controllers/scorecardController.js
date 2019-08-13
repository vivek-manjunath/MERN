/** @format */

const Scorecard = require('../models/Scorecard');
const BattingScorecard = require('../models/BattingScorecard');
const Player = require('../models/Player');
const mongoose = require('mongoose');

module.exports = {
  findAll: function(req, res) {
    Scorecard.find()
      .then(Scorecards => res.json(Scorecards))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Scorecard.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate({path: 'firstInning.battingScorecard', populate: {path: 'batsmanList.playerId'}})
      .populate({path: 'firstInning.bowlingScorecard', populate: {path: 'bowlerList.playerId'}})
      .populate('firstInning.battingTeamId')
      .populate({path: 'secondInning.battingScorecard', populate: {path: 'batsmanList.playerId'}})
      .populate({path: 'secondInning.bowlingScorecard', populate: {path: 'bowlerList.playerId'}})
      .populate('secondInning.battingTeamId')
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
    console.log('Scorecard update called');

    Scorecard.findOne(mongoose.Types.ObjectId(req.params.id), (err, scorecard) => {
      if (req.body.firstInning) {
        scorecard.firstInning = req.body.scorecardId.firstInning;
        scorecard.firstInning.battingScorecard.totalRunsScored = 0;
        scorecard.firstInning.battingScorecard.batsmanList.map(batsmanInfo => {
          scorecard.firstInning.battingScorecard.totalRunsScored += batsmanInfo.runs;
          if (batsmanInfo.runs && batsmanInfo.balls) {
            batsmanInfo.strikeRate = (batsmanInfo.runs / batsmanInfo.balls) * 100;
            batsmanInfo.strikeRate = batsmanInfo.strikeRate.toFixed(2);
          }

          //Update player profile
          Player.findOne(mongoose.Types.ObjectId(batsmanInfo.playerId._id), (err, player) => {
            player.runsScored = player.runsScored || 0;
            player.runsScored += batsmanInfo.runs;
            player.save(err => {
              if (err) res.status(422).json(err);
            });
          });
        });
        //Create batting scorecard
        BattingScorecard.findByIdAndUpdate(scorecard.firstInning.battingScorecard._id, scorecard.firstInning.battingScorecard, {upsert: true}).then(newBattingScorecard => {
          console.log('batting scorecard created');
          scorecard.firstInning.battingScorecard = mongoose.Types.ObjectId(newBattingScorecard._id);
        });
      }

      scorecard.save(err => {
        if (err) res.status(422).json(err);
        scorecard.populate([], (err, scorecard) => {
          console.log('Scorecard updated. ' + scorecard);
          res.status(200).json(scorecard);
        });
      });
    });
  },

  addBattingScorecard: function(req, res) {
    BattingScorecard.create({}).then(newBattingScorecard => {
      Scorecard.findOne(mongoose.Types.ObjectId(req.params.id), function(err, scorecard) {
        if (err) res.status(422).json(err);
        scorecard.firstInning = {};
        scorecard.firstInning.battingScorecard = newBattingScorecard;
        scorecard.save(err => {
          if (err) res.status(422).json(err);
          scorecard.populate('firstInning.battingScorecard', (err, match) => {
            res.status(200).json(scorecard);
          });
        });
      });
    });
  },
  remove: function(req, res) {
    Scorecard.findById({ScorecardId: req.params.id})
      .then(Scorecard => Scorecard.remove())
      .then(allScorecards => res.json(allScorecards))
      .catch(err => res.status(422).json(err));
  },
};
