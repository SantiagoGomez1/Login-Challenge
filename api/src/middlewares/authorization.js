const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
    } else {
      res.sendStatus(403);
    }

    jwt.verify(req.token, process.env.jwtSecret, (error, authData) => {
      if (error) {
        res.sendStatus(403);
      } else {
        next()
      }
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = verifyToken;
