const { RegistrationModel } = require("../models");

// Create and save new RegistrationModel.
exports.create = async (req, res) => {
  // Validate request.
  if (
    !req.body.ritem_name ||
    !req.body.ordered_quantity ||
    !req.body.ritem_id
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an RegistrationModel.
  const item = {
    ritem_name: req.body.ritem_name,
    ordered_quantity: req.body.ordered_quantity,
    ritem_id: req.body.ritem_id,
    ritem_quantity: req.body.ritem_quantity,
    export_order_id: req.body.export_order_id,
    import_order_id: req.body.import_order_id,
  };

  await RegistrationModel.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the RegistrationModel.",
      });
    });
};

// Delete an RegistrationModel with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await RegistrationModel.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "RegistrationModel was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update RegistrationModel with id=${id}. Maybe RegistrationModel was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting RegistrationModel with id=${id}`,
      });
    });
};
