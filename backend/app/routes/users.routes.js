module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  const router = require("express").Router();

  // Create and save new user.
  router.post("/", users.create);

  // Retrieve a single user with specified id.
  router.get("/:id", users.getItemById);

  // Delete an user with the specified id.
  router.delete("/:id", users.delete);

  app.use("api/users", router);
};
