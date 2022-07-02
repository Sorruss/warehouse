module.exports = (backend) => {
  const auth = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  // Log in.
  router.post("/login", auth.logIn);

  // Log Out.
  router.post("/logout", auth.logOut);

  // Log Up.
  router.post("/logup", auth.logUp);

  backend.use("/auth", router);
};
