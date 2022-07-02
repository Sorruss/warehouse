const auth = require("../middleware/auth");

module.exports = (backend) => {
  const company = require("../controllers/company.controller.js");

  const router = require("express").Router();

  // Retrieve all company.
  router.get("/", auth.verifyToken, company.getItems);

  // Create and save new company.
  router.post("/", auth.verifyToken, company.create);

  // Retrieve a single company with specified id.
  router.get("/:id", auth.verifyToken, company.getItemById);

  // Update an company by the id.
  router.put("/:id", auth.verifyToken, company.updateItem);

  // Patch an company by the id.
  router.patch("/:id", auth.verifyToken, company.patchItem);

  // Delete an company with the specified id.
  router.delete("/:id", auth.verifyToken, company.delete);

  backend.use("/api/company", router);
};
