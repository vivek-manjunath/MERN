/** @format */

const Match = require('../models/Match');
const Scorecard = require('../models/Scorecard');
const BattingScorecard = require('../models/BattingScorecard');
const BowlingScorecard = require('../models/BowlingScorecard');
const Tournament = require('../models/Tournament');
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
      .populate({
        path: 'scorecardId',
        populate: {path: 'firstInning.battingScorecard', populate: {path: 'batsmanList.bowler'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'firstInning.battingScorecard', populate: {path: 'batsmanList.fielder'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'firstInning.bowlingScorecard', populate: {path: 'bowlerList.playerId'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'secondInning.battingScorecard', populate: {path: 'batsmanList.playerId'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'secondInning.bowlingScorecard', populate: {path: 'bowlerList.playerId'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'secondInning.battingScorecard', populate: {path: 'batsmanList.bowler'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'secondInning.battingScorecard', populate: {path: 'batsmanList.fielder'}},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'firstInning.battingTeamId'},
      })
      .populate({
        path: 'scorecardId',
        populate: {path: 'secondInning.battingTeamId'},
      })
      .then(match => {
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
    var match = await Match.findOne(mongoose.Types.ObjectId(req.params.id));
    match.winningTeamId = req.body.winningTeamId;
    match.tossWinningTeamId = req.body.tossWinningTeamId;
    match.tossDecision = req.body.tossDecision;
    if (!match.scorecardId) {
      var firstInningBattingTeamId = '';
      var firstInningBowlingTeamId = '';
      var secondInningBattingTeamId = '';
      var secondInningBowlingTeamId = '';

      if (
        (match.tossWinningTeamId === req.body.homeTeamId._id && match.tossDecision == 'bat') ||
        (match.tossWinningTeamId === req.body.awayTeamId._id && match.tossDecision == 'bowl')
      ) {
        firstInningBattingTeamId = req.body.homeTeamId._id;
        firstInningBowlingTeamId = req.body.awayTeamId._id;

        secondInningBattingTeamId = req.body.awayTeamId._id;
        secondInningBowlingTeamId = req.body.homeTeamId._id;
      } else {
        firstInningBattingTeamId = req.body.awayTeamId._id;
        firstInningBowlingTeamId = req.body.homeTeamId._id;

        secondInningBattingTeamId = req.body.homeTeamId._id;
        secondInningBowlingTeamId = req.body.awayTeamId._id;
      }
      var firstInningBattingScorecard = await BattingScorecard.create({});
      var firstInningBowlingScorecard = await BowlingScorecard.create({});
      var secondInningBattingScorecard = await BattingScorecard.create({});
      var secondInningBowlingScorecard = await BowlingScorecard.create({});
      var newScorecard = await Scorecard.create({
        firstInning: {
          battingTeamId: firstInningBattingTeamId,
          bowlingTeamId: firstInningBowlingTeamId,
          battingScorecard: firstInningBattingScorecard,
          bowlingScorecard: firstInningBowlingScorecard,
        },
        secondInning: {
          battingTeamId: secondInningBattingTeamId,
          bowlingTeamId: secondInningBowlingTeamId,
          battingScorecard: secondInningBattingScorecard,
          bowlingScorecard: secondInningBowlingScorecard,
        },
      });
      match.scorecardId = mongoose.Types.ObjectId(newScorecard._id);
    }
    match.save(async err => {
      if (err) res.status(422).json(err);
      //Update tournament stats
      await updateTournamentStats(match);

      match.populate('scorecardId', (err, match) => {
        res.status(200).json(match);
      });
    });
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

async function updateTournamentStats(match) {
  var currentTournament = await Tournament.findOne(mongoose.Types.ObjectId(match.tournamentId));

  var homeTeamMatches = await Match.count({tournamentId: match.tournamentId, $or: [{homeTeamId: match.homeTeamId}, {awayTeamId: match.homeTeamId}]});
  var awayTeamMatches = await Match.count({tournamentId: match.tournamentId, $or: [{homeTeamId: match.awayTeamId}, {awayTeamId: match.awayTeamId}]});
  var homeTeamTotalWins = await Match.count({tournamentId: match.tournamentId, winningTeamId: match.homeTeamId});
  var awayTeamTotalWins = await Match.count({tournamentId: match.tournamentId, winningTeamId: match.awayTeamId});
  var homeTeamTotalLosses = await Match.count({tournamentId: match.tournamentId, winningTeamId: {$ne: match.homeTeamId}});
  var awayTeamTotalLosses = await Match.count({tournamentId: match.tournamentId, winningTeamId: {$ne: match.awayTeamId}});

  currentTournament.participatingTeams.map(team => {
    if (team.teamId.equals(match.homeTeamId)) {
      team.totalMatches = homeTeamMatches;
      team.totalWins = homeTeamTotalWins;
      team.totalLosses = homeTeamTotalLosses;
      team.points = homeTeamTotalWins * 2;
    }
    if (team.teamId.equals(match.awayTeamId)) {
      team.totalMatches = awayTeamMatches;
      team.totalWins = awayTeamTotalWins;
      team.totalLosses = awayTeamTotalLosses;
      team.points = awayTeamTotalWins * 2;
    }
  });

  currentTournament.save(err => {
    if (err) res.status(422).json(err);
  });
}
