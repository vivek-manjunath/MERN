const router = require('express').Router();
const tournamentController = require('../controllers/tournamentController');

router
    .route('/')
    .get(tournamentController.findAll)
    .post(tournamentController.create)

router
    .route('/:id')
    .get(tournamentController.findById)
    .put(tournamentController.update)
    .delete(tournamentController.remove)

module.exports = router;