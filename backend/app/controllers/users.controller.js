const { User } = require("../models");
const md5 = require("md5");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/users/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("file");

// Create and save new User.
exports.create = async (req, res) => {
  // Validate request.
  if (
    !req.body.first_name ||
    !req.body.middle_name ||
    !req.body.last_name ||
    !req.body.user_position ||
    !req.body.phone1 ||
    !req.body.phone2 ||
    !req.body.user_password ||
    !req.body.company_id
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an User.
  const user = {
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    last_name: req.body.last_name,
    user_position: req.body.user_position,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photo_src: req.body.photo_src,
    user_password: md5(req.body.user_password),
    company_id: req.body.company_id,
    user_role: req.body.user_role,
    user_login: req.body.user_login,
  };

  await User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the User.",
      });
    });
};

// Retrieve all Users.
exports.getItems = async (req, res) => {
  await User.findAll({ where: { company_id: req.user.company_id } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Retrieve a single User with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving an User with id ${id}`,
      });
    });
};

// Delete an User with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "User was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting User with id=${id}`,
      });
    });
};

exports.attachPhoto = async (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      throw new Error("A Multer error occurred when uploading.");
    } else if (err) {
      // An unknown error occurred when uploading.
      throw new Error("An unknown error occurred when uploading.");
    }

    res.send({ message: "File was successfully uploaded." });
  });
};

exports.getPhoto = async (req, res) => {
  const id = req.params.id;
  let filename;
  await User.findByPk(id).then((data) => {
    filename = data.photo_src;
  });
  res.sendFile(path.resolve(__dirname, `../../images/users/${filename}`));
};

// Update an User by the id.
exports.patch = async (req, res) => {
  const id = req.params.id;

  await User.findByPk(id).then((user) => {
    if (user) {
      user.update(req.body).then(() => {
        res.send({
          message: "User was patched successfully.",
        });
      });
    }
  });
};
