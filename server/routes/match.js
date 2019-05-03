const router = require('express').Router();
const matchController = require('../controllers/matchController');

router
    .route('/')
    .get(matchController.findAll)
    .post(matchController.create)

router
    .route('/:id')
    .get(matchController.findById)
    .put(matchController.update)
    .delete(matchController.remove)

router
    .route('/filter')
    .post(matchController.filter)

module.exports = router;