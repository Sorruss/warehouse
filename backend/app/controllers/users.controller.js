const { User } = require("../models");

// Create and save new User.
exports.create = async (req, res) => {
  // Validate request.
  if (
    !req.body.first_name ||
    !req.body.middle_name ||
    !req.body.last_name ||
    !req.body.user_position ||
    !req.body.phone1 ||
    !req.body.phone2 ||
    !req.body.user_password ||
    !req.body.company_id
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an User.
  const user = {
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    user_position: req.body.user_position,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photo_src: req.body.photo_src,
    user_password: req.body.user_password,
    company_id: req.body.company_id,
  };

  await User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the User.",
      });
    });
};

// Retrieve all Users.
exports.getItems = async (req, res) => {
  await User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Retrieve a single User with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await User.findByPk(id)
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id } })
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
