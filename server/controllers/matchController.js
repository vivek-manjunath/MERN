/** @format */

const Match = require('../models/Match');
const Scorecard = require('../models/Scorecard');
const BattingScorecard = require('../models/BattingScorecard');
const BowlingScorecard = require('../models/BowlingScorecard');
const mongoose = require('mongoose');

module.exports = {
  findAll: function(req, res) {
    Match.find()
      .populate('homeTeamId')
      .populate('awayTeamId')
      .populate('tournamentId')
      .populate('umpiringTeamId')
      .populate('scorecardId')
      .then(matches => res.json(matches))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Match.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate('homeTeamId')
      .populate('awayTeamId')
      .populate({
        path: 'scorecardId',
        populate: {path: 'firstInning.battingScorecard', populate: {path: 'batsmanList.playerId'}},
      })
      //.populate({path: 'scorecardId.firstInning.battingScorecard.batsmanList', populate: "playerId"})
      // .populate({ path: "scorecardId.teamA.battingScorecard.playerId" })
      .then(match => {
        if (match.scorecardId && match.scorecardId.teamA && match.scorecardId.teamA.battingScorecard) {
          match.scorecardId.teamA.battingScorecard.map(batsmanInfo => {
            batsmanInfo.playerId.fullName = batsmanInfo.playerId.firstName + ' ';
            if (batsmanInfo.playerId.middleName) batsmanInfo.playerId.fullName += batsmanInfo.playerId.middleName + ' ';
            if (batsmanInfo.playerId.lastName) batsmanInfo.playerId.fullName += batsmanInfo.playerId.lastName + ' ';
            console.log(batsmanInfo.playerId.fullName);
          });
        }
        res.json(match);
      })
      .catch(err => res.status(422).json(err));
  },
  filter: function(req, res) {
    const {tournamentId, teamId, venueId} = req.body;

    let filter = {};
    if (req.params) {
      if (tournamentId && tournamentId != 'All') filter.tournamentId = mongoose.Types.ObjectId(tournamentId);
      if (teamId && teamId != 'All') {
        filter.$or = [];
        filter.$or.push({homeTeamId: mongoose.Types.ObjectId(teamId)});
        filter.$or.push({awayTeamId: mongoose.Types.ObjectId(teamId)});
      }
      if (venueId && venueId != 'All') filter.venueId = mongoose.Types.ObjectId(venueId);
    }
    Match.find(filter)
      .populate('homeTeamId')
      .populate('awayTeamId')
      .populate('tournamentId')
      .populate('umpiringTeamId')
      .then(matches => res.json(matches))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Match.create(req.body)
      .then(newMatch => res.json(newMatch))
      .catch(err => res.status(422).json(err));
  },
  update: async function(req, res) {
    console.log('1');
    var match = await Match.findOne(mongoose.Types.ObjectId(req.params.id));
    console.log('2');
    match.winningTeamId = req.body.winningTeamId;
    match.tossWinningTeamId = req.body.tossWinningTeamId;
    match.tossDecision = req.body.tossDecision;
    if (!match.scorecardId) {
      var firstInningBattingScorecard = await BattingScorecard.create({});
      var firstInningBowlingScorecard = await BowlingScorecard.create({});
      var secondInningBattingScorecard = await BattingScorecard.create({});
      var secondInningBowlingScorecard = await BowlingScorecard.create({});
      var newScorecard = await Scorecard.create({
        firstInning: {
          battingScorecard: firstInningBattingScorecard,
          bowlingScorecard: firstInningBowlingScorecard,
        },
        secondInning: {
          battingScorecard: secondInningBattingScorecard,
          bowlingScorecard: secondInningBowlingScorecard,
        },
      });
      console.log('3');
      match.scorecardId = mongoose.Types.ObjectId(newScorecard._id);
    } else {
      Scorecard.findOne(mongoose.Types.ObjectId(match.scorecardId._id), function(err, scorecard) {
        scorecard.firstInning.battingTeamId = req.body.scorecardId.firstInning.battingTeamId;
        scorecard.firstInning.bowlingTeamId = req.body.scorecardId.firstInning.bowlingTeamId;
        scorecard.secondInning.battingTeamId = req.body.scorecardId.secondInning.battingTeamId;
        scorecard.secondInning.bowlingTeamId = req.body.scorecardId.secondInning.bowlingTeamId;

        scorecard.save(err => {
          if (err) res.status(422).json(err);
        });
      });
    }
    console.log('4');
    match.save(err => {
      if (err) res.status(422).json(err);
      match.populate('scorecardId', (err, match) => {
        res.status(200).json(match);
      });
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
      _id: req.params.id,
    })
      .then(match => match.remove())
      .then(allMatches => res.json(allMatches))
      .catch(err => res.status(422).json(err));
  },
};
