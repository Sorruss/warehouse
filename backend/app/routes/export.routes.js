module.exports = (app) => {
  const export_ = require("../controllers/export.controller.js");

  const router = require("express").Router();

  // Retrieve all export items.
  router.get("/", export_.getItems);

  // Create and save new export item.
  router.post("/", export_.create);

  // Retrieve a single export item with specified id.
  router.get("/:id", export_.getItemById);

  // Update an export Item by the id.
  router.put("/:id", export_.updateItem);

  // Delete an export Item with the specified id.
  router.delete("/:id", export_.delete);

  // Delete all export Items.
  router.delete("/", export_.deleteAll);

  app.use("api/export", router);
};
