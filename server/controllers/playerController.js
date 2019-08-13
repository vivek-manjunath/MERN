/** @format */

const Player = require('../models/Player');
const mongoose = require('mongoose');

module.exports = {
  findAll: function(req, res) {
    Player.find()
      .then(players => res.json(players))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    Player.findById(mongoose.Types.ObjectId(req.params.id))
      .then(player => res.json(player))
      .catch(err => res.status(422).json(err));
  },
  getTopBatsmen: function(req, res) {
    console.log('Get top players');
    Player.find()
      .sort({runsScored: -1})
      .limit(3)
      .then(batsmen => {
        res.json(batsmen);
      })
      .catch(err => res.status(422).json(err));
  },
  getTopBowlers: function(req, res) {
    Player.find()
      .sort({wicketsTaken: -1})
      .limit(3)
      .then(bowlers => {
        res.json(bowlers);
      })
      .catch(err => res.status(422).json(err));
  },
  findByTeam: function(req, res) {
    Player.find({
      'teamsPlayedFor._id': mongoose.Types.ObjectId(req.params.id),
      'teamsPlayedFor.isActiveMember': true,
    })
      .populate('teamsPlayedFor._id')
      .exec((err, player) => {
        if (err) res.status(422).json(err);
        res.json(player);
      });
  },
  create: function(req, res) {
    let _newPlayerInfo = req.body;
    _newPlayerInfo = {
      ..._newPlayerInfo,
      teamsPlayedFor: [{_id: _newPlayerInfo.team, isActiveMember: true}],
    };
    Player.create(_newPlayerInfo)
      .then(newPlayer => res.json(newPlayer))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Player.findOneAndUpdate({teamId: req.params.id}, req.body)
      .then(player => res.json(player))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Player.findById(mongoose.Types.ObjectId(req.params.id))
      .then(player => {
        player.remove();
        Player.find()
          .then(players => res.json(players))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
};
