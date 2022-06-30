const db = require("../models");
const Users = db.users;

// Create and save new User.
exports.create = (req, res) => {
  // Validate request.
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an User.
  const user = {
    name: req.body.name,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    position: req.body.position,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photoSrc: req.body.photoSrc,
  };

  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the User.",
      });
    });
};

// Retrieve a single User with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Users.getItemById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving an User with id ${id}`,
      });
    });
};

// Delete an User with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.delete({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "User was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting User with id=${id}`,
      });
    });
};
