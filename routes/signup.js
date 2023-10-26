const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/SignUpController");

router.post("/", signUpController.handleSignUp);

module.exports = router;
