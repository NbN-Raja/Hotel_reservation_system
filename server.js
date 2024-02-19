require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const bodyParser = require("body-parser");

// Process Dot env access here

// for Password Reset Here

const ejs = require("ejs");

const app = express();



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(bodyParser.json());

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });



// simple route
app.get("/", (req, res) => {
  res.send("welcome to Hotel Registration ");
});

app.get("/neraj",(req,res)=>{
  res.render("esewa")
})

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/hotels.routes")(app);
require("./app/routes/hotel_res.routes")(app);
require("./app/routes/hotels_review.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/passwordreset.routes")(app);
require("./app/routes/moddash.routes")(app);

// Google Login here

require("./app/routes/google_login.routes")(app);

// image path
app.get("/hotelimage", express.static("./public/hotel_img"));

app.get("/esewa", function (req, res, next) {
  res.render("esewa");
});

// password reset here

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
