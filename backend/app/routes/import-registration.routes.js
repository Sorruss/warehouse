module.exports = (backend) => {
  const importRegistration = require("../controllers/import-registration.controller.js");

  const router = require("express").Router();

  // Retrieve all importRegistration items.
  router.get("/", importRegistration.getItems);

  // Create and importRegistration save new item.
  router.post("/", importRegistration.create);

  // Retrieve a importRegistration single item with specified id.
  router.get("/:id", importRegistration.getItemById);

  // Delete an importRegistration Item with the specified id.
  router.delete("/:id", importRegistration.delete);

  backend.use("/api/import-registration", router);
};
