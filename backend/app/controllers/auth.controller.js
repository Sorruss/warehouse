const { User, Company } = require("../models");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const conf = require("../config/config.json");

exports.logIn = async function (req, res) {
  // Validate request.
  if (
    !req.body.company_id ||
    !req.body.company_password ||
    !req.body.user_login ||
    !req.body.user_password
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  const companyNotFound = await Company.findOne({
    where: {
      special_id: req.body.company_id,
      company_password: md5(req.body.company_password),
    },
    include: User,
  }).then((company) => {
    if (
      !company ||
      !company.Users.find((user) => user.user_login === req.body.user_login)
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (companyNotFound) {
    res.status(400).send({ message: "Incorrect credentials" });
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
        let token = jwt.sign({ user }, conf.jwt_secret, {
          expiresIn: "24h",
        });
        res.status(200).send({ status: 1, user, token });
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
