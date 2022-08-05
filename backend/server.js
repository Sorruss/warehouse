const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { getRandomNumber } = require("../backend/app/functions");

const basename = path.basename(__filename);
const backend = express();

// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images/temp/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage }).single("file");

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
};

backend.use(cors(corsOptions));
backend.use(express.json({ limit: "50mb" }));
backend.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync DB");
// });

backend.get("/", (req, res) => {
  res.json({ message: "simple route" });
});
backend.get("/entry_photo", (req, res) => {
  let photoPath = path.resolve(__dirname, "../backend/images/entry/");
  fs.readdir(photoPath, (err, files) => {
    let number = files.length;
    let filename;

    number = getRandomNumber(1, number);
    for (let file of files) {
      if (String(number) === file.split(".")[0]) {
        filename = file;
      }
    }

    photoPath = path.resolve(photoPath, filename);
    res.sendFile(photoPath);
  });
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
