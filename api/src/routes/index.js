const express = require("express");
const cors = require("cors");

const verifyToken = require("../middlewares/authorization");
const newUser = require("../controllers/POST/newUser");
const getUsers = require("../controllers/GET/getUsers");
const getUser = require("../controllers/GET/getUser");
const logIn = require("../controllers/POST/logIn");
const newPublication = require("../controllers/POST/newPublication");
const getAllPublications = require("../controllers/GET/getPublications");
const deletePublication = require("../controllers/DELETE/deletePublication");
const updatePublication = require("../controllers/PUT/updatePublication");
const setFollowing = require("../controllers/POST/following");
const deleteFollower = require("../controllers/DELETE/deleteFollower");

const router = express.Router();

//USER
router.post("/signup", newUser);
router.post("/login", logIn);
router.get("/users", getUsers);
router.get("/user/:id", [cors(), verifyToken], getUser);

//PUBLICATIONS
router.post("/user/publication", [cors(), verifyToken], newPublication);
router.get("/publications", [cors(), verifyToken], getAllPublications);
router.put("/publications", [cors(), verifyToken], updatePublication);
router.delete("/publications", [cors(), verifyToken], deletePublication);

//FOLLOWERS - fOLLOWING
router.post("/user/following", setFollowing);
router.delete("/unfollow", deleteFollower);

module.exports = router;
