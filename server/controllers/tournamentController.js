const Tournament = require('../models/Tournament');
const mongoose = require('mongoose');

module.exports = {
    findAll: function(req, res){
        Tournament.find()
            .then(tournaments => res.json(tournaments))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res){        
        Tournament.find(mongoose.Types.ObjectId(req.params.id))
            .then(tournament => res.json(tournament))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        Tournament.create(req.body)
            .then(newTournament => res.json(newTournament))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res){
        Tournament.findOneAndUpdate({tournamentId: req.params.id}, req.body)
            .then(tournament => res.json(tournament))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res){
        Tournament.findById({tournamentId: req.params.id})
            .then(tournament => tournament.remove())
            .then(allTournaments => res.json(allTournaments))
            .catch(err => res.status(422).json(err));
    },
}