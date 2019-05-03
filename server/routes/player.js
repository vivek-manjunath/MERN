const router = require('express').Router();
const playerController = require('../controllers/playerController');

router
    .route('/')
    .get(playerController.findAll)
    .post(playerController.create)

router
    .route('/:id')
    .get(playerController.findById)
    .put(playerController.update)
    .delete(playerController.remove)

router
    .route('/getPlayersByTeam/:id')
    .get(playerController.findByTeam)

module.exports = router;