const db = require("../models");
const Rooms = require("../models/rooms.model")
require("./auth.controller")



exports.create=(req,res)=>{

    // Validate request
   if (!req.body.Room_type) {
     res.status(400).send({ message: "Content can not be empty!" });
     return;
   }

   const id= req.params.id
   // Create a Tutorial
   const hotels = new Rooms({
     Room_type:req.body.Room_type,
     Room_price:req.body.Room_price,
     Room_capacity:req.body.Room_capacity,
     Room_foodservices:req.body.Room_foodservices,
     Room_ac:req.body.Room_ac,
     Room_images:req.body.Room_images,
     hotel_id:id,
     Room_amenities:req.body.Room_amenities
   });
 
   // Save Tutorial in the database
   if({id:id}){
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
    }else{

    }
    
 
 }
 

//  Find All Available rooms of hotels here 


exports.findall=(req,res)=>{

  const Room_type = req.query.hotel_name;
  var condition = Room_type ? { Room_type: { $regex: new RegExp(Room_type), $options: "i" } } : {};


  Rooms.find({})
    .then(data => {
      // res.send(data);
      res.render("room",{datas:data});
      // console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}



// Esewa Here 

exports.esewa=(req,res)=>{

  // res.render("esewa")
  const id= req.params.id
    Rooms.findById(id)
    .then(data => {
      // if (!data)
      //   res.status(404).send({ message: "Not found Hotels with id " + id });
      // else res.send(data);
       res.render("esewa",{
        data:data
      });
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Hotels with id=" + id });
    });

}





// Success Roites Hwree 

exports.success=(req,res)=>{

  res.send("Success Payment here ")

}

// Failed Routes Here 
exports.failed=(req,res)=>{

  res.send("Failed here transcation")
}