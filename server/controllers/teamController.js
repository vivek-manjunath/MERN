const Team = require('../models/Team');
const mongoose = require('mongoose');

module.exports = {
    findAll: function(req, res){
        Team.find({isActive: true})
            .sort('name')
            .select({_id: 1, name: 1})            
            .then(teams => res.json(teams))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res){
        Team.findById(mongoose.Types.ObjectId(req.params.id))
            .populate("captainId")
            .then(team => res.json(team))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res){
        Team.create(req.body)
            .then(newTeam => res.json(newTeam))
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res){
        Team.findOneAndUpdate({teamId: req.params.id}, req.body)
            .then(team => res.json(team))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res){
        console.log('Delete request: ' + req.params.id)
        Team.findById(mongoose.Types.ObjectId(req.params.id))
            .then(team => {
                team.remove();
                Team.find()
                    .then(teams => res.json(teams))
                    .catch(err => res.status(422).json(err));
            })           
            .catch(err => res.status(422).json(err));
    },
}