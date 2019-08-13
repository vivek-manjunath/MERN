/** @format */

const router = require('express').Router();
const bowlingScorecardController = require('../controllers/bowlingScorecardController');

router.route('/').post(bowlingScorecardController.create);

router
  .route('/:id')
  .get(bowlingScorecardController.findById)
  .put(bowlingScorecardController.update)
  .delete(bowlingScorecardController.remove);

router.route('/addBowlerInfo/:bowlingScorecardId').put(bowlingScorecardController.addBowlerInfo);

module.exports = router;
