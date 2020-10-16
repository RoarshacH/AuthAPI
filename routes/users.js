const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check_auth");
const UserController = require("../controllers/user");




router.post("/newuser", UserController.newUser);

router.get("/:userID", checkAuth, UserController.getUser);

router.patch("/:userID", checkAuth,UserController.updateUser);

router.delete("/:userID", checkAuth,UserController.deleteUser);

module.exports = router;