const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const checkAuth = require("../middleware/check_auth");

const UserController = require("../controllers/user");

router.get("/:userID", checkAuth, UserController.getUser);

router.post("/newuser", UserController.newUser);

router.patch("/:userID", checkAuth,UserController.updateUser);

router.delete("/:userID", checkAuth,UserController.deleteUser);

module.exports = router;