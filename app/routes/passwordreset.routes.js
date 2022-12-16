module.exports = (app) => {
  const passwordreset = require("../controllers/passwordreset.controller");

  var router = require("express").Router();

  router.post("/change/:id", passwordreset.passwordchange);
  router.get("/change", passwordreset.getpasswordchange);

  router.get("/reset", passwordreset.passwordreset);

  // Send Email verification here
  router.get("/sendemail/:token", passwordreset.sendverification);

  // Now Verify Email Here
  router.get("/emailverify/:token", passwordreset.sendemailverify);

  // Password Reset Is Here
  router.post("/password-reset/", passwordreset.passwordreset);

  // Password Reset Get  Through Gmail here
  router.get("/reset-password/", passwordreset.resetpassword);

  router.post("/reset-password/post/:token", passwordreset.resetpasswordpost);

  app.use("/api/auth", router);
};
