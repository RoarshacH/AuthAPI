const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const WebsiteController = require("../controllers/website");


router.post("/signup", checkAuth,WebsiteController.signup);

router.get("/login", WebsiteController.login);

module.exports = router;