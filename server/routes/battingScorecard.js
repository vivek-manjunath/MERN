const router = require("express").Router();
const battingScorecardController = require("../controllers/battingScorecardController");

router.route("/").post(battingScorecardController.create);

router
  .route("/:id")
  .get(battingScorecardController.findById)
  .put(battingScorecardController.update)
  .delete(battingScorecardController.remove);

router
  .route("/addBatsmanInfo/:battingScorecardId")
  .put(battingScorecardController.addBatsmanInfo);
module.exports = router;
