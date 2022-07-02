const auth = require("../middleware/auth");

module.exports = (backend) => {
  const items = require("../controllers/items.controller.js");

  const router = require("express").Router();

  // Retrieve all items.
  router.get("/", auth.verifyToken, items.getItems);

  // Create and save new item.
  router.post("/", auth.verifyToken, items.create);

  // Retrieve a single item with specified id.
  router.get("/:id", auth.verifyToken, items.getItemById);

  // Update an Item by the id.
  router.put("/:id", auth.verifyToken, items.updateItem);

  // Patch an Item by the id.
  router.patch("/:id", auth.verifyToken, items.patchItem);

  // Delete an Item with the specified id.
  router.delete("/:id", auth.verifyToken, items.delete);

  // Delete all Items.
  router.delete("/", auth.verifyToken, items.deleteAll);

  backend.use("/api/items", router);
};
