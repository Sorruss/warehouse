const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const backend = express();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

backend.use(cors(corsOptions));
backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync DB");
// });

backend.get("/", (req, res) => {
  res.json({ message: "simple route" });
});

fs.readdirSync("./app/routes")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    require(`./app/routes/${file}`)(backend);
  });

const PORT = process.env.PORT || 8080;
backend.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
