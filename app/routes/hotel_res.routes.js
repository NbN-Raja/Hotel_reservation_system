module.exports = (app) => {
  var router = require("express").Router();
  const hotels_res = require("../controllers/hotel_res.controller.js");

  // Book a reservation
  router.post("/", hotels_res.create);

  // Get By Id
  router.get("/:id", hotels_res.getbyid);

  // Get All Reservations
  router.get("/", hotels_res.getall);

  // Update a reservation
  router.put("/:id", hotels_res.update);

  app.use("/api/hotelres", router);
};
