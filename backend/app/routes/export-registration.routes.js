module.exports = (app) => {
  const exportRegistration = require("../export-registration/cart.controller.js");

  const router = require("express").Router();

  // Retrieve all exportRegistration items.
  router.get("/", exportRegistration.getItems);

  // Create and save new exportRegistration item.
  router.post("/", exportRegistration.create);

  // Retrieve a single exportRegistration item with specified id.
  router.get("/:id", exportRegistration.getItemById);

  // Delete an exportRegistration Item with the specified id.
  router.delete("/:id", exportRegistration.delete);

  app.use("api/export-registration", router);
};
