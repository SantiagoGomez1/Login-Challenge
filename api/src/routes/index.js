const express = require("express");
const cors = require("cors");

const newUser = require("../controllers/newUser");
const getUsers = require("../controllers/getUsers");
const getUser = require("../controllers/getUser");
const logIn = require("../controllers/logIn");
const verifyToken = require("../middlewares/authorization");

const router = express.Router();

router.post("/signup", newUser);
router.post("/login", logIn);
router.get("/users", getUsers);
router.get("/user/:id", [cors(), verifyToken], getUser);

module.exports = router;
