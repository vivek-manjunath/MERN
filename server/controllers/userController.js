const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
    findAll: function (req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        User.findById(mongoose.Types.ObjectId(req.params.id))
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        User.findOneAndUpdate({
                userId: req.params.id
            }, req.body)
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        User.findById(mongoose.Types.ObjectId(req.params.id))
            .then(user => {
                user.remove();
                User.find()
                    .then(users => res.json(users))
                    .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },
}