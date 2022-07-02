const jwt = require("jsonwebtoken");
const conf = require("../config/config.json");

module.exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    jwt.verify(
      req.headers.authorization,
      conf.jwt_secret,
      function (err, decoded) {
        if (decoded) {
          req.user = decoded.user;
          next();
        } else {
          res.status(401).send({ message: "Unauthorized" });
        }
      }
    );
  }
};
