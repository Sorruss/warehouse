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
  router.get("/photo/:id", users.getPhoto);

  // Retrieve a single user with specified id.
  router.get("/:id", auth.verifyToken, users.getItemById);

  // Delete an user with the specified id.
  router.delete("/:id", auth.verifyToken, users.delete);

  backend.use("/api/users", router);
};
