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
  router.post("/create/:id", upload.single("Hotel_image"), hotels.create);

  // Retrieve all Hotels
  router.get("/", hotels.findAll);

  // Find By Hotels Moderator 
  router.get("/mod/:id", hotels.findbyid);

  // Retrieve all published Hotels
  router.get("/published", hotels.findAllHotels);

  // Retrieve a single Hotelswith id
  router.get("/:id", hotels.findOne);

  // Search with hotel name

  // asd
  router.post("/", hotels.findbyname);

  // Update a Hotelswith id
  router.put("/:id", upload.single("Hotel_image"), hotels.update);

  // Delete a Hotelswith id
  router.delete("/:id", hotels.delete);

  // soft delete Data Only Set Deleted at
  router.put("/softdelete/:id", hotels.softdelete);

  // Restore Deleted Data By Moderator Only
  router.put("/restore/:id", hotels.restore);

  // Create a new Tutorial
  router.delete("/", hotels.deleteAll);

  // Review System
  router.get("/review", hotels.review);

  // Delete Hotels and Rooms of that Hotels

  router.put("/cascadedel/:id", hotels.cascading);

  app.use("/v2/api/hotels", router);
};

// Image Upload Here
