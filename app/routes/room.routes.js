const multer = require("multer");

module.exports = (app) => {
    const rooms= require("../controllers/room.controller.js");
  
    var router = require("express").Router();
  
   
    const path = require("path");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, "../public/Room_img"));
        },
        filename: function (req, file, cb) {
          const name = Date.now() + "-" + file.originalname;
          cb(null, name);
        },
      });
    
      const upload = multer({ storage: storage });






    //   Create rooms for the hotels using Hotel ID:

       router.post("/:id", upload.single("Room_image"), rooms.create);


       app.use("/api/rooms",router)



}