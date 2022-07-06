const { Producer, Item } = require("../models");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/producers/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("file");

// Create and save new Producer.
exports.create = async (req, res) => {
  // Validate request.
  if (
    !req.body.producer_name ||
    !req.body.phone1 ||
    !req.body.phone2 ||
    !req.body.description
  ) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  // Create an Producer.
  const item = {
    producer_name: req.body.producer_name,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    photo_src: req.body.photo_src,
    description: req.body.description,
  };

  await Producer.create(item)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the Producer.",
      });
    });
};

// Retrieve all Producer.
exports.getItems = async (req, res) => {
  await Producer.findAll({
    order: [["id", "desc"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Producer.",
      });
    });
};

// Retrieve a single Producer with specified id.
exports.getItemById = async (req, res) => {
  const id = req.params.id;

  await Producer.findByPk(id, {
    include: Item,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Some error occurred while retrieving a Producer with id ${id}`,
      });
    });
};

// Update an Producer by the id.
exports.patchItem = async (req, res) => {
  const id = req.params.id;

  await Producer.findByPk(id).then((producer) => {
    if (producer) {
      producer.update(req.body).then(() => {
        res.send({
          message: "Producer was patched successfully.",
        });
      });
    }
  });
};

// Update an Producer by the id.
exports.updateItem = async (req, res) => {
  const id = req.params.id;

  await Producer.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Producer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Producer with id=${id}. Maybe Producer was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating Producer with id=${id}`,
      });
    });
};

// Delete an Producer with the specified id.
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Producer.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Producer was deleted successfully" });
      } else {
        res.send({
          message: `Cannot update Producer with id=${id}. Maybe Producer was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting Producer with id=${id}`,
      });
    });
};

// Delete all Producer.
exports.deleteAll = async (req, res) => {
  await Producer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Producer were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Producer.",
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
  await Producer.findByPk(id).then((data) => {
    filename = data.photo_src;
  });
  res.sendFile(path.resolve(__dirname, `../../images/producers/${filename}`));
};
