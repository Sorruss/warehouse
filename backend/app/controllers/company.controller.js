const db = require("../models");
const Company = db.company;
const Op = db.Sequelize.Op;

// Create and save new Company.
exports.create = (req, res) => {
  // Validate request.
  if (
    !req.body.company_name ||
    !req.body.phone1 ||
    !req.body.phone2 ||
    !req.body.special_id ||
    !req.body.company_password ||
    !req.body.description
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Company.
  const item = {
    company_name: req.body.company_name,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photo_src: req.body.photo_src,
    special_id: req.body.special_id,
    company_password: req.body.company_password,
    description: req.body.description,
  };

  Company.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Company.",
      });
    });
};

// Retrieve all Company.
exports.getItems = (req, res) => {
  const company_name = req.query.company_name;
  const condition = company_name
    ? { company_name: { [Op.iLike]: `%${company_name}%` } }
    : null;

  Company.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Company.",
      });
    });
};

// Retrieve a single Company with specified id.
exports.getItemById = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a Company with id ${id}`,
      });
    });
};

// Update an Company by the id.
exports.updateItem = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Company was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Company with id=${id}`,
      });
    });
};

// Delete an Company with the specified id.
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Company was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Company with id=${id}`,
      });
    });
};

// Delete all Company.
exports.deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Company were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Company.",
      });
    });
};
