const auth = require("../middleware/auth");

module.exports = (backend) => {
  const users = require("../controllers/users.controller.js");

  const router = require("express").Router();

  // Create and save new user.
  router.post("/", auth.verifyToken, users.create);

  // Retrieve all Users.
  router.get("/", auth.verifyToken, users.getItems);

  // Attach a photo to the user.
  router.post("/photo", auth.verifyToken, users.attachPhoto);

  // Get a photo of the user.
  router.get("/photo/:id", users.getPhotoByItemId);

  // Get a photo of the user by the name.
  router.get("/user_photo/:name", users.getPhotoByPhotoName);

  // Delete a photo of the user by the name.
  router.delete(
    "/user_photo/:name",
    auth.verifyToken,
    users.deletePhotoByPhotoName
  );

  // Delete a photo of the user.
  router.delete("/photo/:id", auth.verifyToken, users.deletePhotoByItemId);

  // Patch an Item by the id.
  router.patch("/:id", auth.verifyToken, users.patch);

  // Get a photo of the user.
  router.get("/photo/:id", users.getPhoto);

  // Retrieve a single user with specified id.
  router.get("/:id", auth.verifyToken, users.getItemById);

  // Delete an user with the specified id.
  router.delete("/:id", auth.verifyToken, users.delete);

  backend.use("/api/users", router);
};
