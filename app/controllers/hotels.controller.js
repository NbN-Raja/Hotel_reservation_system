const db = require("../models");
const Hotel = require("../models/hotels.model");
require("./auth.controller");
const fs = require("fs");
const Hotels = require("../models/hotels.model");
const Rooms = require("../models/rooms.model");
const { log } = require("console");

// Create and Save a new Hotels
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Hotel_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  console.log(req.body.id);
  // Create a Hotels
  const hotel = new Hotel({
    Hotel_name: req.body.Hotel_name,
    Hotel_description: req.body.Hotel_description,
    Hotel_address: req.body.Hotel_address,
    // Hotel_image: req.file.filename,
    Hotel_email: req.body.Hotel_email,
    Hotel_phone: req.body.Hotel_phone,
    Mod_id: req.params.id,
  });

  // Save Hotels in the database
  hotel
    .save(hotel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hotels.",
      });
    });
};

// Retrieve all Hotelss from the database.
exports.findAll = (req, res) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  const hotel_name = req.query.hotel_name;

  var condition = hotel_name
    ? { hotel_name: { $regex: new RegExp(hotel_name), $options: "i" } }
    : {};

  Hotel.find(condition)
    .then((data) => {
      res.send(data);
      // res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Hotelss.",
      });
    });
};

// Find a single Hotels with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Hotels with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + id });
    });
};

exports.findAllHotels = (req, res) => {
  res.send("demo");
};

// Get comment and review
exports.review = (req, res) => {
  res.send("demo");
};

// Find all hotels by Name Searching Post in heading

exports.findbyname = (req, res) => {
  const Hotel_name = req.body.Hotel_name;

  Hotel.find({ Hotel_name: Hotel_name })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Hotels with id " + Hotel_name });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + Hotel_name });
    });
};

// Update a Hotels by the id in the request
exports.update = (req, res) => {
  //If File have then push file into reqBody then process update

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // Review image here
  id = req.params.id;

  // Get Old image and Unlink The images
  //If File have then push file into reqBody then process update
  var imgUrl = "";
  if (req.file) var imgUrl = `../public/hotel_img/${req.file.filename}`;
  req.body.Hotel_image = imgUrl;

  //Check user have photo/image. if had then first delete local file then database
  const userInfo = Hotel.findById(id);
  //  console.log(userInfo.Hotel_image)
  const userPhotoInfo = userInfo.imgUrl;
  if (userPhotoInfo) {
    fs.unlinkSync(DIR + userPhotoInfo);
  }

  Hotel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Hotels with id=${id}. Maybe Hotels was not found!`,
        });
      } else
        res.send({
          data: data,
          // photo_url:`http://localhost:8080/hotelimage/${req.file.filename}`,
          imgUrl,
          message: "Hotels was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Hotels with id=" + id,
      });
    });
};

// Using Soft

exports.softdelete = (req, res) => {
  const id = req.params.id;

  Hotel.findByIdAndUpdate(id, [{ $set: { deletedAt: Date.now() } }])

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
        });
      } else {
        Rooms.findOneAndUpdate(
          { hotel_id: id },
          { $set: { deletedAt: Date.now() } }
        ).then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
            });
          } else {
          }
        });
        res.send({
          message: "Hotels was  successfully Deleted !",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hotels with id=" + err,
      });
    });
};

// Restore Hotels here

exports.restore = (req, res) => {
  const id = req.params.id;

  Hotel.findByIdAndUpdate(id, [{ $set: { restoreAt: Date.now() } }])

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
        });
      } else {
        Rooms.findOneAndUpdate(
          { hotel_id: id },
          { $set: { restoreAt: Date.now() } }
        ).then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
            });
          } else {
          }
        });
        res.send({
          message: "Hotels was  successfully Deleted !",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hotels with id=" + err,
      });
    });
};

// Delete a Hotels with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
        });
      } else {
        res.send({
          message: "Hotels was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hotels with id=" + err,
      });
    });
};

exports.deleteAll = (req, res) => {
  Hotel.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Hotelss were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Hotelss.",
      });
    });
};

exports.cascading = (req, res) => {
  const id = req.params.id;

  // Hotel.findOneAndUpdate(id, req.body, {isdeleted: true})

  Rooms.find({ hotel_id: id }, [{ $set: { deletedAt: Date.now() } }])

    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Hotels with id=${id}. Maybe Hotels was not found!`,
        });
      } else {
        res.send({
          message: "Hotels was  successfully Deleted !",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Hotels with id=" + err,
      });
    });
};
