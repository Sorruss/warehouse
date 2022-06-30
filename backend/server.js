const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const backend = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

backend.use(cors(corsOptions));
backend.use(bodyParser.json());
backend.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync DB");
});

backend.get("/", (req, res) => {
  res.json({ message: "simple route" });
});

require("./app/routes/items.routes")(backend);

const PORT = process.env.PORT || 8080;
backend.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
