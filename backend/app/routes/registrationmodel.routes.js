module.exports = (backend) => {
  const rmodel = require("../controllers/registrationmodel.controller.js");

  const router = require("express").Router();

  // Create and save new rmodel.
  router.post("/", rmodel.create);

  // Delete an rmodel with the specified id.
  router.delete("/:id", rmodel.delete);

  backend.use("/api/rmodel", router);
};
