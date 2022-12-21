require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// Process Dot env access here

// for Password Reset Here

const ejs = require("ejs");

const app = express();

// let corsOptions = {
//   origin: "https://nbn-hotel-reservation-backend.clouds.nepalicloud.com/",
// };

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
  .connect(`mongodb+srv://admin:OoGjsS8Dv4e8cR5Q@cluster0.cvbnyxo.mongodb.net/test`, {
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

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:OoGjsS8Dv4e8cR5Q@cluster0.cvbnyxo.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// simple route
app.get("/", (req, res) => {
  res.send("welcome to Hotel Registration ");
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/hotels.routes")(app);
require("./app/routes/hotel_res.routes")(app);
require("./app/routes/hotels_review.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/passwordreset.routes")(app);

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
