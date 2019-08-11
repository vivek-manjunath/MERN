const router = require("express").Router();
const bowlingScorecardController = require("../controllers/bowlingScorecardController");

router.route("/").post(bowlingScorecardController.create);

router
  .route("/:id")
  .get(bowlingScorecardController.findById)
  .put(bowlingScorecardController.update)
  .delete(bowlingScorecardController.remove);

module.exports = router;
