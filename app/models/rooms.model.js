
const mongoose= require("mongoose")
// Rooms models here 
const Rooms = mongoose.model(
    "room",
    new mongoose.Schema({
      Room_type : String,
      Room_price: Number,
      Room_capacity : Number,
      Room_foodservices : Number,
      Room_ac:String,
      Room_images:String,
      hotel_id:String,
      Room_amenities:[],
  
      
      time : { type: Date, default: (new Date()).getTime(),
      
       }
     
    })
  );
  
  
  module.exports = Rooms;