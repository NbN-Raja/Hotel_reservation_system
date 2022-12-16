const multer = require("multer");
module.exports = (app) => {
  const hotels_review = require("../controllers/hotel_review.controller.js");

  var router = require("express").Router();

  const path = require("path");

  // Create a new Tutorial
  router.post("/", hotels_review.create);

  //   // Retrieve all Tutorials
  router.post("/:id", hotels_review.savebyid);

  //   // Retrieve all published Tutorials
  router.get("/:getallhr", hotels_review.findAllHotelsandreview);

  //   // Retrieve a single Hotelswith id
    // router.get("/:id", hotels_review.findOne);

  // Search with hotel name

  //   router.post("/:Hotel_name", hotels_review.findbyname)

  //   // Update a Hotelswith id
  //   router.put("/:id", hotels_review.update);

  //   // Delete a Hotelswith id
  //   router.delete("/:id", hotels_review.delete);

  //   // Create a new Tutorial
  //   router.delete("/", hotels_review.deleteAll);

  //   // Review System
  //   router.get("/review",hotels_review.review)

  app.use("/hotelreview", router);
};

// Image Upload Here
