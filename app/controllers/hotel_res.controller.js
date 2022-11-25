const db = require("../models");
const Hotel_reservation = require("../models/hotel_res.model")
require("./auth.controller")

exports.create=(req,res)=>{

   // Validate request
  if (!req.body.Username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const hotels = new Hotel_reservation({
    Username : req.body.Username,
    Lastname: req.body.Lastname,
    Address:req.body.Address,
    Email : req.body.Email,
    Phone : req.body.Phone,
    Entry_date:req.body.Entry_date,
    Exit_date: req.body.Exit_date,
    Room_type:req.body.Room_type,
    Hotel_id:req.body.Hotel_id,
    Price:req.body.Price
  });

  // Save Tutorial in the database
  hotels
    .save(hotels)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  
   

}


exports.getbyid=(req,res)=>{

  const id=req.params.id

  Hotel_reservation.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Hotels with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + id });
    });



}


// GetAll 

exports.getall=(req,res)=>{

  const Username = req.query.Username;
  var condition = Username ? { Username: { $regex: new RegExp(Username), $options: "i" } } : {};

  Hotel_reservation.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}



// Update A Hotel Reservation


// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

 

  Hotel_reservation.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });

};
