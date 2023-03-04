const { authJwt } = require("../middlewares");
const controller = require("../controllers/moddash.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 
  app.get(
    "/api/test/mod/hotels/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.hotellist
  );

  app.get(
    "/api/test/mod/totalhotels/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.totalhotels
  );

  app.get("/api/test/mod/rooms/:id",controller.rooms
  );

  
  app.get("/api/test/mod/totalrooms/:id",controller.totalrooms
  );


  



 
};
