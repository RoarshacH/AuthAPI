const express = require("express");
const router = express.Router();
const AuthenticateController = require("../controllers/authenticate");


router.get("/:userID", AuthenticateController.authenticate);

router.get("/:userID/forgetMobile", AuthenticateController.forgetMobile);

router.get("/:userID/OTPAuth", AuthenticateController.otpAuth);

module.exports = router;