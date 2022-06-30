module.exports = (backend) => {
  const cart = require("../controllers/cart.controller.js");

  const router = require("express").Router();

  // Retrieve all cart items.
  router.get("/", cart.getItems);

  // Create and save new cart item.
  router.post("/", cart.create);

  // Retrieve a single cart item with specified id.
  router.get("/:id", cart.getItemById);

  // Update an cart Item by the id.
  router.put("/:id", cart.updateItem);

  // Delete an cart Item with the specified id.
  router.delete("/:id", cart.delete);

  // Delete all cart Items.
  router.delete("/", cart.deleteAll);

  backend.use("/api/cart", router);
};
