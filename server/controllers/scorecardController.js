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
      .populate('firstInning.battingTeamId')
      // .populate({
      //   path: 'scorecardId',
      //   populate: {path: 'firstInning.battingScorecard', populate: {path: 'batsmanList.playerId'}},
      // })
      // .populate("teamA.battingScorecard.fielder")
      // .populate("teamA.battingScorecard.bowler")
      // .populate("teamB.bowlingScorecard.playerId")
      // .populate("teamA.teamId")
      .exec((err, scorecard) => {
        if (err) res.status(422).json(err);
        // scorecard.firstInn.battingScorecard.map(batsmanInfo => {
        //   batsmanInfo.playerId.fullName = batsmanInfo.playerId.firstName + " ";
        //   if (batsmanInfo.playerId.middleName)
        //     batsmanInfo.playerId.fullName +=
        //       batsmanInfo.playerId.middleName + " ";
        //   if (batsmanInfo.playerId.lastName)
        //     batsmanInfo.playerId.fullName +=
        //       batsmanInfo.playerId.lastName + " ";
        // });
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

    // var temaAScorecard = req.body.teamA;
    // temaAScorecard.teamTotal = 0;

    // temaAScorecard.battingScorecard.map(batsmanInfo => {
    //   temaAScorecard.teamTotal += batsmanInfo.runs;
    //   if (batsmanInfo.runs && batsmanInfo.balls) {
    //     batsmanInfo.strikeRate = (batsmanInfo.runs / batsmanInfo.balls) * 100;
    //   }
    //     Player.findOne(
    //       mongoose.Types.ObjectId(batsmanInfo.playerId._id),
    //       (err, player) => {
    //         player.runsScored = player.runsScored || 0;
    //         player.runsScored += batsmanInfo.runs;
    //         player.save(err => {
    //           if (err) res.status(422).json(err);
    //         });
    //       }
    //     );
    // });

    // if (temaAScorecard.extras) {
    //   temaAScorecard.teamTotal +=
    //     (temaAScorecard.extras.noBalls
    //       ? parseInt(temaAScorecard.extras.noBalls)
    //       : 0) +
    //     (temaAScorecard.extras.wides
    //       ? parseInt(temaAScorecard.extras.wides)
    //       : 0) +
    //     (temaAScorecard.extras.byes ? parseInt(temaAScorecard.extras.byes) : 0);
    // }
    // console.log(temaAScorecard.battingScorecard);
    // Scorecard.findByIdAndUpdate(
    //   mongoose.Types.ObjectId(req.params.id),
    //   temaAScorecard,
    //   {
    //     new: true
    //   }
    // )
    //   .populate("teamA.battingScorecard.playerId")
    //   .populate("teamA.battingScorecard.fielder")
    //   .populate("teamA.battingScorecard.bowler")
    //   .exec((err, scorecard) => {
    //     if (err) res.status(422).json(err);
    //     res.status(200).json(scorecard);
    //   });

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

        // scorecard.teamB.bowlingScorecard.map(bowlerInfo => {
        //   if (bowlerInfo.runs && bowlerInfo.oversBowled) {
        //     bowlerInfo.economy = bowlerInfo.runs / bowlerInfo.oversBowled;
        //     bowlerInfo.economy = bowlerInfo.economy.toFixed(2);
        //   }
        //   Player.findOne(
        //     mongoose.Types.ObjectId(bowlerInfo.playerId._id),
        //     (err, player) => {
        //       player.wicketsTaken = player.wicketsTaken || 0;
        //       player.wicketsTaken += bowlerInfo.wickets;
        //       player.save(err => {
        //         if (err) res.status(422).json(err);
        //       });
        //     }
        //   );
        // });

        // if (req.body.teamA.extras) {
        //   scorecard.teamA.extras.totalExtras = 0;
        //   scorecard.teamA.extras.totalExtras +=
        //     (req.body.teamA.extras.noBalls
        //       ? parseInt(req.body.teamA.extras.noBalls)
        //       : 0) +
        //     (req.body.teamA.extras.wides
        //       ? parseInt(req.body.teamA.extras.wides)
        //       : 0) +
        //     (req.body.teamA.extras.byes
        //       ? parseInt(req.body.teamA.extras.byes)
        //       : 0);

        //   scorecard.teamA.teamTotal += scorecard.teamA.extras.totalExtras;
        // }
      }

      scorecard.save(err => {
        if (err) res.status(422).json(err);
        scorecard.populate(
          [
            // "teamA.battingScorecard.playerId",
            // "teamA.battingScorecard.fielder",
            // "teamA.battingScorecard.bowler",
            // "teamB.bowlingScorecard.playerId"
          ],
          (err, scorecard) => {
            console.log('Scorecard updated. ' + scorecard);
            res.status(200).json(scorecard);
          },
        );
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
