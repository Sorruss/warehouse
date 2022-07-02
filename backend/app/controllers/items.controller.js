const { Item, Producer } = require("../models");

// Create and save new item.
exports.create = async (req, res) => {
  // Validate request.
  if (
    !req.body.item_name ||
    !req.body.quantity ||
    !req.body.description ||
    !req.body.producer_id ||
    !req.body.company_id
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Item.
  const item = {
    item_name: req.body.item_name,
    income_date: req.body.income_date,
    quantity: req.body.quantity,
    description: req.body.description,
    producer_id: req.body.producer_id,
    photo_src: req.body.photo_src,
    company_id: req.body.company_id,
  };

  await Item.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the Item.",
      });
    });
};

// Retrieve all Items.
exports.getItems = async (req, res) => {
  await Item.findAll({
    where: { company_id: req.user.company_id },
    order: [["id", "desc"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving items.",
      });
    });
};

// Retrieve a single item with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await Item.findByPk(id, { include: Producer })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving an item with id ${id}`,
      });
    });
};

// Update an Item by the id.
exports.patchItem = async (req, res) => {
  const id = req.params.id;

  await Item.findByPk(id).then((item) => {
    if (item) {
      item.update(req.body).then(() => {
        res.send({
          message: "Item was patched successfully.",
        });
      });
    }
  });
};

// Update an Item by the id.
exports.updateItem = async (req, res) => {
  const id = req.params.id;

  await Item.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Item with id=${id}`,
      });
    });
};

// Delete an Item with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Item.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Item with id=${id}`,
      });
    });
};

// Delete all Items.
exports.deleteAll = async (req, res) => {
  await Item.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all items.",
      });
    });
};
