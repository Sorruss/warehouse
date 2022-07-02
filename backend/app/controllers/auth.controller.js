const { User } = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

exports.logIn = async function (req, res) {
  // Validate request.
  if (
    // !req.body.company_id ||
    // !req.body.company_password ||
    !req.body.user_login ||
    !req.body.user_password
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  await User.findOne({
    where: {
      user_login: req.body.user_login,
      user_password: md5(req.body.user_password),
    },
  })
    .then((user) => {
      if (user) {
        let token = jwt.sign({ user }, "secret");
        res.status(200).send({ status: 1, user, token: token });
      } else {
        res.status(400).send({
          message: "Incorrect credentials",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error ocurred while creating the cart item.",
      });
    });
};

// Log Out.
exports.logOut = async (req, res) => {
  // we just have to reset our user session here.
};

// Log Up.
exports.logUp = async (req, res) => {};
