// const db = require("../models");
// const ExportRegistration = db.ExportOrders;
// const Op = db.Sequelize.Op;

const { ExportOrder, RegistrationModel } = require("../models");

// Create and save new ExportRegistration item.
exports.create = async (req, res) => {
  // Validate request.
  if (!req.body.owner_id) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an ExportRegistration item.
  const item = {
    order_name: req.body.order_name,
    special_id: req.body.special_id,
    income_date: req.body.income_date,
    owner_id: req.body.owner_id,
  };

  // Set default values if they were not specified.
  if (!item.special_id) {
    const min = 10001;
    const max = 99999;
    item.special_id = Math.floor(Math.random() * (max - min) + min);
  }
  if (!item.order_name) {
    item.order_name = `Замовлення №${item.special_id}`;
  }

  await ExportOrder.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the ExportOrder item.",
      });
    });
};

// Retrieve all ExportOrder items.
exports.getItems = async (req, res) => {
  // const order_name = req.query.order_name;
  // const condition = order_name
  //   ? { order_name: { [Op.iLike]: `%${order_name}%` } }
  //   : null;

  await ExportOrder.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving ExportRegistration items.",
      });
    });
};

// Retrieve a single ExportRegistration item with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await ExportOrder.findByPk(id, { include: RegistrationModel })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a ExportRegistration item with id ${id}`,
      });
    });
};

// Delete an ExportRegistration item with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await ExportOrder.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "ExportRegistration item was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot update ExportRegistration item with id=${id}. Maybe ExportRegistration item was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting ExportRegistration item with id=${id}`,
      });
    });
};
