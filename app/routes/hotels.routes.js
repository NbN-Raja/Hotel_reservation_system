const multer = require("multer");
module.exports = (app) => {
  const hotels = require("../controllers/hotels.controller.js");

  var router = require("express").Router();

  const path = require("path");

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/hotel_img"));
    },
    filename: function (req, file, cb) {
      const name = Date.now() + "-" + file.originalname;
      cb(null, name);
    },
  });

  const upload = multer({ storage: storage });

  // Create a new Tutorial
  router.post("/", upload.single("Hotel_image"), hotels.create);

  // Retrieve all Hotels
  router.get("/", hotels.findAll);

  // Retrieve all published Hotels
  router.get("/published", hotels.findAllHotels);

  // Retrieve a single Hotelswith id
  router.get("/:id", hotels.findOne);

  // Search with hotel name

  router.post("/:Hotel_name", hotels.findbyname);

  // Update a Hotelswith id
  router.put("/:id", upload.single("Hotel_image"), hotels.update);

  // Delete a Hotelswith id
  router.delete("/:id", hotels.delete);

  // Create a new Tutorial
  router.delete("/", hotels.deleteAll);

  // Review System
  router.get("/review", hotels.review);

  app.use("/api/hotels", router);
};

// Image Upload Here
