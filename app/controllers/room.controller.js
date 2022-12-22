const db = require("../models");
const Rooms = require("../models/rooms.model");
require("./auth.controller");
require("../models/rooms.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body.Room_type) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;
  // Create a Tutorial
  const rooms = new Rooms({
    Room_type: req.body.Room_type,
    Room_price: req.body.Room_price,
    Room_capacity: req.body.Room_capacity,
    Room_foodservices: req.body.Room_foodservices,
    Room_ac: req.body.Room_ac,
    // Room_images: req.body.Room_images,
    hotel_id: id,
    Room_amenities: req.body.Room_amenities,
  });

  // Save Hotelsin the database
if(id){
  rooms
    .save(rooms)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
}else{

  res.send("Error Occure")
}

}

//  Find All Available rooms of hotels here

exports.getall = (req, res) => {
  
  Rooms.find({})
    .then((data) => {
      res.send(data);
      // res.send(data)
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Hotelss.",
      });
    });
};


// Get Rooms By ID 

exports.getbyid=(req,res)=>{

  const id = req.params.id;

   
  Rooms.find({hotel_id:id})
    .then((data) => {
      
      if (!data)
        res.status(404).send({ message: "Not found Room with id " + id });
      else
     
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Rooms with id=" + err });
    });

}




// Esewa Here

exports.esewa = (req, res) => {
  // res.render("esewa")
  const id = req.params.id;
  Rooms.findById(id)
    .then((data) => {
      // if (!data)
      //   res.status(404).send({ message: "Not found Hotels with id " + id });
      // else res.send(data);
      res.render(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + id });
    });
};

// Success Roites Hwree

exports.success = (req, res) => {
  res.send("Success Payment here ");
};

// Failed Routes Here
exports.failed = (req, res) => {
  res.send("Failed here transcation");
};
