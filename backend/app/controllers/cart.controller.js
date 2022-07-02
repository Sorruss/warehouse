const { Cart, Item } = require("../models");

// Create and save new Cart item.
exports.create = async (req, res) => {
  // Validate request.
  if (!req.body.owner_id || !req.body.ordered_quantity || !req.body.item_id) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Validate if an Item with this item_id already exists.
  let alreadyExist = false;
  await Cart.findOne({ where: { item_id: req.body.item_id } }).then((item) => {
    if (item) {
      item
        .update({
          ordered_quantity: item.ordered_quantity + req.body.ordered_quantity,
        })
        .then(() => {
          res.send({
            message: "Cart Item was patched (ordered_quantity) successfully.",
          });
        });
      alreadyExist = true;
    }
  });

  if (alreadyExist) {
    return;
  }

  // Create an Item.
  const item = {
    ordered_quantity: req.body.ordered_quantity,
    item_id: req.body.item_id,
    owner_id: req.body.owner_id,
  };

  await Cart.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the cart item.",
      });
    });
};

// Retrieve all Cart items.
exports.getItems = async (req, res) => {
  await Cart.findAll({ include: Item, where: { owner_id: req.user.id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart items.",
      });
    });
};

// Retrieve a single Cart item with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await Cart.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a cart item with id ${id}`,
      });
    });
};

// Update an Cart item by the id.
exports.updateItem = async (req, res) => {
  const id = req.params.id;

  await Cart.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Cart item was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update cart item with id=${id}. Maybe item was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating cart item with id=${id}`,
      });
    });
};

// Delete an Cart item with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Cart.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Cart item was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Cart item with id=${id}. Maybe Cart item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Cart item with id=${id}`,
      });
    });
};

// Delete all Cart items.
exports.deleteAll = async (req, res) => {
  await Cart.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cart items were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cart items.",
      });
    });
};
