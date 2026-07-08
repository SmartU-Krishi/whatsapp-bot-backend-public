const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authenticatUser");
const waAdvisoryController = require("../controllers/whatsappBotController/cropAdvisoryController");

// Crop advisory
router.post(
  "/advisory/addAdvisory",
  waAdvisoryController.addCropAdvisoryFromWhatsAppBot
);

router.post(
  "/advisory/addAuthAdvisory",
  authenticateUser,
  waAdvisoryController.addCropAdvisoryFromWhatsAppBot
);

module.exports = router;
