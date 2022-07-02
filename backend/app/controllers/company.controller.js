const { Company } = require("../models");

// Create and save new Company.
exports.create = async (req, res) => {
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

  await Company.create(item)
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
exports.getItems = async (req, res) => {
  await Company.findAll()
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
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await Company.findByPk(id)
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
exports.patchItem = async (req, res) => {
  const id = req.params.id;

  await Company.findByPk(id).then((company) => {
    if (company) {
      company.update(req.body).then(() => {
        res.send({
          message: "Company was patched successfully.",
        });
      });
    }
  });
};

// Update an Company by the id.
exports.updateItem = async (req, res) => {
  const id = req.params.id;

  await Company.update(req.body, {
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
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Company.destroy({ where: { id } })
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
exports.deleteAll = async (req, res) => {
  await Company.destroy({
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
