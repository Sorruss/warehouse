const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const backend = express();

const corsOptions = {
  origin: "http://localhost:4200",
};

backend.use(cors(corsOptions));
backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
// db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync DB");
});

backend.get("/", (req, res) => {
  res.json({ message: "simple route" });
});

for (let route of [
  "cart",
  "company",
  "export-registration",
  "export",
  "import-registration",
  "items",
  "producer",
  "users",
]) {
  require(`./app/routes/${route}.routes.js`)(backend);
}

const PORT = process.env.PORT || 8080;
backend.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
