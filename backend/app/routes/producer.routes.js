const auth = require("../middleware/auth");

module.exports = (backend) => {
  const producer = require("../controllers/producer.controller.js");

  const router = require("express").Router();

  // Retrieve all producer.
  router.get("/", auth.verifyToken, producer.getItems);

  // Create and save new producer.
  router.post("/", auth.verifyToken, producer.create);

  // Attach a photo to the producer.
  router.post("/photo", auth.verifyToken, producer.attachPhoto);

  // Get a photo of the producer.
  router.get("/photo/:id", producer.getPhoto);

  // Retrieve a single producer with specified id.
  router.get("/:id", auth.verifyToken, producer.getItemById);

  // Update an producer by the id.
  router.put("/:id", auth.verifyToken, producer.updateItem);

  // Patch an producer by the id.
  router.patch("/:id", auth.verifyToken, producer.patchItem);

  // Delete an producer with the specified id.
  router.delete("/:id", auth.verifyToken, producer.delete);

  backend.use("/api/producer", router);
};
