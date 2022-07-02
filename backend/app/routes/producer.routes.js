module.exports = (backend) => {
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

  // Patch an producer by the id.
  router.patch("/:id", producer.patchItem);

  // Delete an producer with the specified id.
  router.delete("/:id", producer.delete);

  backend.use("/api/producer", router);
};
