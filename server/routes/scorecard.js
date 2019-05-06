const router = require('express').Router();
const scorecardController = require('../controllers/scorecardController');

router
    .route('/')
    .get(scorecardController.findAll)
    .post(scorecardController.create)

router
    .route('/:id')
    .get(scorecardController.findById)
    .put(scorecardController.update)
    .delete(scorecardController.remove)

// router
//     .route('/filter')
//     .post(matchController.filter)

module.exports = router;