const auth = require("../middleware/auth");

module.exports = (backend) => {
  const rmodel = require("../controllers/registrationmodel.controller.js");

  const router = require("express").Router();

  // Create and save new rmodel.
  router.post("/", auth.verifyToken, rmodel.create);

  // Delete an rmodel with the specified id.
  router.delete("/:id", auth.verifyToken, rmodel.delete);

  backend.use("/api/rmodel", router);
};
