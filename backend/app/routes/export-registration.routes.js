module.exports = (backend) => {
  const exportRegistration = require("../controllers/export-registration.controller.js");

  const router = require("express").Router();

  // Retrieve all exportRegistration items.
  router.get("/", exportRegistration.getItems);

  // Create and save new exportRegistration item.
  router.post("/", exportRegistration.create);

  // Retrieve a single exportRegistration item with specified id.
  router.get("/:id", exportRegistration.getItemById);

  // Delete an exportRegistration Item with the specified id.
  router.delete("/:id", exportRegistration.delete);

  backend.use("/api/export-registration", router);
};
