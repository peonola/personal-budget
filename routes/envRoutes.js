const express = require("express");
const envController = require("../controller/envController");

const router = express.Router();

router.route("/").get(envController.getAllEnvs).post(envController.createEnv);
router
  .route("/:id")
  .get(envController.getEnv)
  .patch(envController.updateEnv)
  .delete(envController.deleteEnv);
router.route("/:from/:to").post(envController.transferEnvBudget);

module.exports = router;
