const db = require("../models");
const Hotels = require("../models/hotels.model");
const Rooms = require("../models/rooms.model");
require("./auth.controller");



exports.hotellist = (req, res) => {
    
    
    const id= req.params.id;
    console.log(id);
    Hotels.find({Mod_id:id})
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


exports.totalhotels = (req, res) => {
    
    
    const id= req.params.id;
    console.log(id);
    Hotels.count({Mod_id:id})
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Hotels with id " + id });
      else res.json("Number of documents in the collection: " + data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + err });
    });

  };


exports.rooms = (req, res) => {
    
    const id= req.params.id;
    console.log(id);
    Rooms.find({hotel_id:id})
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Hotels with id " + id });
      else res.send(data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + err });
    });

  };



  

  exports.totalrooms = (req, res) => {
    
    
    const id= req.params.id;
    console.log(id);
    Rooms.count({hotel_id:id})
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Hotels with id " + id });
      else res.json("Number of documents in the collection: " + data)
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + err });
    });

  };