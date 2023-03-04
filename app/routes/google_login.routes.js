const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const config = require("../config/auth.config");
const db = require("../models");
const multer = require("multer");
const { refreshToken: RefreshToken } = db;
module.exports = (app) => {
  const session = require("express-session");
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "SECRET",
    })
  );

  app.set("view engine", "ejs");

  // Set Passport Package here
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
      done(null, user.id);
    });
  });

  //   Google Main Login With Google here
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        const userProfile = profile;

        User.findOne({ googleid: profile.id }).then((currentuser) => {
          const roles = "63762fcb702e7222ac460e91";
          if (currentuser) {
            // Jwt Sign here
            let token = jwt.sign({ id: profile.id }, config.secret, {
              expiresIn: config.jwtExpiration,
            });

            let refreshToken = jwt.sign({ id: profile.id }, config.secret, {
              expiresIn: config.jwtRefreshExpiration, // 2 minutes
            });

            // req.status(200).send({
            //   id: currentuser._id,
            //   username: currentuser.username,
            //   email: currentuser.email,
            //   roles: authorities,
            //   accessToken: token,
            //   refreshToken: refreshToken,
            // });
            return done(null, currentuser);

            // Refresh Token Here
          } else {
            const user = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              profilePhoto: profile.photos[0].value,
              phone: profile.name.phone,
              //    avatar:profile._json.image.url,
              roles: roles,
              googleid: profile.id,
            });

            user.save(user, (req, res, err) => {
              if (err) {
                res.status(500).send({ message: err }, user);
                return;
              }
              // if (roles) {
              //   Role.find(
              //     {
              //       name: { $in: req.body.roles },
              //     },
              //     (err, roles) => {
              //       if (err) {
              //         res.status(500).send({ message: err });
              //         return;
              //       }

              //     user.roles = [role._id];
              //     user.save((err) => {
              //       if (err) {
              //         res.status(500).send({ message: err });
              //         return;
              //       }

              //       res.redirect("success", { user: req.user });
              //     });
              //   });
              // }
              res.redirect("success", { user: req.id });
              return done(null, user);
            });
          }
        });
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // Redirect User
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/success",
      failureRedirect: "/error",
    }),
    function (req, res) {
      // Successful authentication, redirect success.

      res.redirect("success.ejs");
    }
  );

  // Get Success Here
  const authCheck = (req, res, next) => {
    if (!req.user) {
      res.redirect("auth");
    } else {
      next();
    }
  };

  app.get("/success", authCheck, (req, res) => {
    // res.send("Logged In As Username" + req.user.firstname)
    res.render("success", {
      user: req.user,
    });
  });

  app.get("/auth", function (req, res) {
    res.render("auth");
  });

  // app.get('/auth/google/callback',
  //   passport.authenticate('google'),
  //   function(req, res) {
  //     // Successful authentication, redirect success.

  //     res.redirect('/success');
  //     res.send(req.user)
  //   });

  // check Authenticate User here
  checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth");
  };

  //Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
  app.get("/dashboard", checkAuthenticated, (req, res) => {
    res.render("dashboard.ejs", { name: req.user.displayName });
  });

  //Define the Logout
  app.post("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/auth");
    });
  });
};
