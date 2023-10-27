const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/RefreshTokenController");

router.get("/", refreshTokenController.handleRefeshToken);

module.exports = router;
