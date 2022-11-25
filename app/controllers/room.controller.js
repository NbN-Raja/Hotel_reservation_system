const db = require("../models");
const Rooms = require("../models/hotels.model")
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
 