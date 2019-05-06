const Scorecard = require('../models/Scorecard');
const mongoose = require('mongoose');

module.exports = {
    findAll: function(req, res){
        Scorecard.find()
            .then(Scorecards => res.json(Scorecards))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res){        
        Scorecard.findOne(mongoose.Types.ObjectId(req.params.id))
            .populate('teamA.battingScorecard.playerId')
            .populate('teamA.teamId')
            .exec((err, scorecard) => {
                if(err) res.status(422).json(err);
                res.json(scorecard)
            })            

    },
    create: function(req, res){
        Scorecard.create(req.body)
            .then(newScorecard => res.json(newScorecard))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res){
        Scorecard.findOneAndUpdate({ScorecardId: req.params.id}, req.body)
            .then(Scorecard => res.json(Scorecard))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res){
        Scorecard.findById({ScorecardId: req.params.id})
            .then(Scorecard => Scorecard.remove())
            .then(allScorecards => res.json(allScorecards))
            .catch(err => res.status(422).json(err));
    },
}