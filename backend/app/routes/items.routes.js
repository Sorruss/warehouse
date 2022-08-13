const auth = require("../middleware/auth");

module.exports = (backend) => {
  const items = require("../controllers/items.controller.js");

  const router = require("express").Router();

  // Retrieve all items.
  router.get("/", auth.verifyToken, items.getItems);

  // Create and save new item.
  router.post("/", auth.verifyToken, items.create);

  // Attach a photo to the item.
  router.post("/photo", auth.verifyToken, items.attachPhoto);

  // Get a photo of the item.
  router.get("/photo/:id", items.getPhotoByItemId);

  // Get a photo of the item by the name.
  router.get("/item_photo/:name", items.getPhotoByPhotoName);

  // Delete a photo of the item by the name.
  router.delete(
    "/item_photo/:name",
    auth.verifyToken,
    items.deletePhotoByPhotoName
  );

  // Delete a photo of the item.
  router.delete("/photo/:id", auth.verifyToken, items.deletePhotoByItemId);

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
