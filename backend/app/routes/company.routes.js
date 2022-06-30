module.exports = (app) => {
  const company = require("../controllers/company.controller.js");

  const router = require("express").Router();

  // Retrieve all company.
  router.get("/", company.getItems);

  // Create and save new company.
  router.post("/", company.create);

  // Retrieve a single company with specified id.
  router.get("/:id", company.getItemById);

  // Update an company by the id.
  router.put("/:id", company.updateItem);

  // Delete an company with the specified id.
  router.delete("/:id", company.delete);

  app.use("api/items", router);
};
