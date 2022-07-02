const auth = require("../middleware/auth");

module.exports = (backend) => {
  const cart = require("../controllers/cart.controller.js");

  const router = require("express").Router();

  // Retrieve all cart items.
  router.get("/", auth.verifyToken, cart.getItems);

  // Create and save new cart item.
  router.post("/", auth.verifyToken, cart.create);

  // Retrieve a single cart item with specified id.
  router.get("/:id", auth.verifyToken, cart.getItemById);

  // Update an cart Item by the id.
  router.put("/:id", auth.verifyToken, cart.updateItem);

  // Delete an cart Item with the specified id.
  router.delete("/:id", auth.verifyToken, cart.delete);

  // Delete all cart Items.
  router.delete("/", auth.verifyToken, cart.deleteAll);

  backend.use("/api/cart", router);
};
