const db = require("../models");
const Hotel_review = require("../models/hotels_review.model")
require("./auth.controller")

exports.create=(req,res)=>{

   // Validate request
  if (!req.body.comment) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const hotels = new Hotel_review({
    star:req.body.star,
    comment:req.body.comment,
    like:req.body.like,
    Hotel_id:req.params.id
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



// Hello  Hotel Reservation System 

// Send Review/comment in hotel with hotel id 

exports.savebyid=(req,res)=>{

    id=req.params.id

    const hotels = new Hotel_review({
        star:req.body.star,
        comment:req.body.comment,
        like:req.body.like,
        hotel_id:id
      });

      if({id:id}){
    hotels.save(hotels)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Review  was Setted successfully.",data });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
      }else{

      }

}


// Get All Hotels and review 
exports.findAllHotelsandreview=(req,res)=>{

  res.send("All hotels and review")

  
}