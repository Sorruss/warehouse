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

  // Get a photo of the producer by id.
  router.get("/photo/:id", producer.getPhotoByItemId);

  // Get a photo of the producer by name.
  router.get("/prod_photo/:name", producer.getPhotoByPhotoName);

  // Delete a photo of the producer by id.
  router.delete("/photo/:id", auth.verifyToken, producer.deletePhotoByItemId);

  // Delete a photo of the producer by name.
  router.delete(
    "/prod_photo/:name",
    auth.verifyToken,
    producer.deletePhotoByPhotoName
  );

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
