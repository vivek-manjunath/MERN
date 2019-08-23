/** @format */

const Tournament = require('../models/Tournament');
const mongoose = require('mongoose');

module.exports = {
  findAll: function(req, res) {
    Tournament.find()
      .populate({path: 'participatingTeams.teamId'})
      .then(tournaments => res.json(tournaments))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Tournament.findOne(mongoose.Types.ObjectId(req.params.id))
      .populate({path: 'participatingTeams.teamId'})
      .then(tournament => {
        // tournament.participatingTeams.sort((a, b) => {
        //   let a_points = a.points | 0;
        //   let b_points = b.points | 0;
        //   return a_points < b_points;
        // });
        res.json(tournament);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    Tournament.create(req.body)
      .then(newTournament => res.json(newTournament))
      .catch(err => res.status(422).json(err));
  },
  update: async function(req, res) {
    var tournament = await Tournament.findOne(mongoose.Types.ObjectId(req.params.id));
    var _participatingTeams = req.body.participatingTeams;
    var _selectedPool = req.body.selectedPool;
    _participatingTeams.map(teamId => {
      tournament.participatingTeams = [...tournament.participatingTeams, {teamId: mongoose.Types.ObjectId(teamId), pool: _selectedPool}];
    });
    console.log('saving...');
    tournament.save(err => {
      if (err) res.status(422).json(err);
      res.status(200).json(tournament);
    });
  },
  findByPool: function(req, res) {
    Tournament.aggregate(
      [
        {
          $match: {_id: mongoose.Types.ObjectId(req.params.id)},
        },
        {
          $group: {
            _id: '$participatingTeams.pool',
            teams: {$addToSet: '$participatingTeams.teamId'},
          },
        },
      ],
      (err, result) => {
        if (err) res.status(422).json(err);
        res.status(200).json(result);
      },
    );
  },
  remove: function(req, res) {
    Tournament.findById({tournamentId: req.params.id})
      .then(tournament => tournament.remove())
      .then(allTournaments => res.json(allTournaments))
      .catch(err => res.status(422).json(err));
  },
};
