const auth = require("../middleware/auth");

module.exports = (backend) => {
  const export_ = require("../controllers/export.controller.js");

  const router = require("express").Router();

  // Retrieve all export items.
  router.get("/", auth.verifyToken, export_.getItems);

  // Create and save new export item.
  router.post("/", auth.verifyToken, export_.create);

  // Retrieve a single export item with specified id.
  router.get("/:id", auth.verifyToken, export_.getItemById);

  // Update an export Item by the id.
  router.put("/:id", auth.verifyToken, export_.updateItem);

  // Delete an export Item with the specified id.
  router.delete("/:id", auth.verifyToken, export_.delete);

  backend.use("/api/export", router);
};
