const { Export, Item } = require("../models");

// Create and save new Export item.
exports.create = async (req, res) => {
  // Validate request.
  if (!req.body.ordered_quantity || !req.body.item_id || !req.body.owner_id) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Validate if an Item with this item_id already exists.
  let alreadyExist = false;
  await Export.findOne({ where: { item_id: req.body.item_id } }).then(
    (item) => {
      if (item) {
        item
          .update({
            ordered_quantity: item.ordered_quantity + req.body.ordered_quantity,
          })
          .then(() => {
            res.send({
              message:
                "Export Item was patched (ordered_quantity) successfully.",
            });
          });
        alreadyExist = true;
      }
    }
  );

  if (alreadyExist) {
    return;
  }

  // Create an Export item.
  const item = {
    ordered_quantity: req.body.ordered_quantity,
    item_id: req.body.item_id,
    owner_id: req.body.owner_id,
  };

  await Export.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Export item.",
      });
    });
};

// Retrieve all Export items.
exports.getItems = async (req, res) => {
  await Export.findAll({ include: Item, where: { owner_id: req.user.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Export items.",
      });
    });
};

// Retrieve a single Export item with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await Export.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a Export item with id ${id}`,
      });
    });
};

// Update an Export item by the id.
exports.patchItem = async (req, res) => {
  const id = req.params.id;

  await Export.findByPk(id).then((item) => {
    if (item) {
      item.update(req.body).then(() => {
        res.send({
          message: "Export item was patched successfully.",
        });
      });
    }
  });
};

// Update an Export item by the id.
exports.updateItem = async (req, res) => {
  const id = req.params.id;

  await Export.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Export item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Export item with id=${id}. Maybe item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Export item with id=${id}`,
      });
    });
};

// Delete an Export item with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Export.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Export item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Export item with id=${id}. Maybe Export item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Export item with id=${id}`,
      });
    });
};

// Delete all Export items.
exports.deleteAll = async (req, res) => {
  await Export.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Export items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Export items.",
      });
    });
};
