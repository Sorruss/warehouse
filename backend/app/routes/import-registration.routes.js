module.exports = (app) => {
  const importRegistration = require("../import-registration/cart.controller.js");

  const router = require("express").Router();

  // Retrieve all importRegistration items.
  router.get("/", importRegistration.getItems);

  // Create and importRegistration save new item.
  router.post("/", importRegistration.create);

  // Retrieve a importRegistration single item with specified id.
  router.get("/:id", importRegistration.getItemById);

  // Delete an importRegistration Item with the specified id.
  router.delete("/:id", importRegistration.delete);

  app.use("api/import-registration", router);
};
