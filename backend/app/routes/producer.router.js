module.exports = (app) => {
  const producer = require("../controllers/producer.controller.js");

  const router = require("express").Router();

  // Retrieve all producer.
  router.get("/", producer.getItems);

  // Create and save new producer.
  router.post("/", producer.create);

  // Retrieve a single producer with specified id.
  router.get("/:id", producer.getItemById);

  // Update an producer by the id.
  router.put("/:id", producer.updateItem);

  // Delete an producer with the specified id.
  router.delete("/:id", producer.delete);

  app.use("api/items", router);
};
