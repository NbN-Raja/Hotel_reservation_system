const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const multer= require("multer")


// Multer for uplading the avatar 


module.exports = function(app) {


  const path = require("path");

  const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/user_avatar"));
      },
      filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
      },
    });
  
    const upload = multer({ storage: storage });



  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",upload.single("avatar"),
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/refreshtoken", controller.refreshToken);

  // Local Password Reser here 
  


  

  
};
