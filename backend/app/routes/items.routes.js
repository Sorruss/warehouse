module.exports = (backend) => {
  const items = require("../controllers/items.controller.js");

  const router = require("express").Router();

  // Retrieve all items.
  router.get("/", items.getItems);

  // Create and save new item.
  router.post("/", items.create);

  // Retrieve a single item with specified id.
  router.get("/:id", items.getItemById);

  // Update an Item by the id.
  router.put("/:id", items.updateItem);

  // Delete an Item with the specified id.
  router.delete("/:id", items.delete);

  // Delete all Items.
  router.delete("/", items.deleteAll);

  backend.use("/api/items", router);
};
