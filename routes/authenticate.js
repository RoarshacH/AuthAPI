const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const AuthenticateController = require("../controllers/authenticate");


router.get("/:userID", AuthenticateController.authenticate);

router.get("/:userID/forgetMobile", checkAuth, AuthenticateController.forgetMobile);

router.get("/:userID/OTPAuth", checkAuth, AuthenticateController.otpAuth);

module.exports = router;