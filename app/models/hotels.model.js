const mongoose = require("mongoose");
const User= require("./user.model")

const Hotels = mongoose.model(
  "Hotel",
  new mongoose.Schema({
    Hotel_name : String,
    Hotel_description: String,
    Hotel_address : String,
    Hotel_phone : Number,
    Hotel_image:String,
    Hotel_email: String,
    Mod_id:String,
    Price:Number,
    
    time : { type: Date, default: (new Date()).getTime(),
    
     }
   
  })
);


module.exports = Hotels;




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