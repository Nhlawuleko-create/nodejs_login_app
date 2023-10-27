const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/RefreshTokenController");

router.post("/", refreshTokenController.handleRefeshToken);

module.exports = router;
