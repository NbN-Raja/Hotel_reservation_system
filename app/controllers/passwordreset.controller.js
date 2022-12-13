const db = require("../models");
const multer = require("multer");
const { user: User, role: Role } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const user = require("../models/user.model");
const resetToken = require("../models/resetToken.model");

const mailer = require("./sendmail");

exports.passwordchange = (req, res) => {
  const id = req.params.id;
  console.log(id);

  User.findById(id).then((data) => {
    if (!data) {
      res.status(404).send({ message: "Not found user with id " + id });
    } else {
      let passwordIsValid = bcrypt.compare(req.body.cpassword, data.password);

      // Password match here
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      } else {
        const hpassword = bcrypt.hashSync(req.body.npassword, 8);
        console.log(hpassword);

        const p = User.findOneAndUpdate(
          { id: id },
          { password: hpassword }
        ).then();
        if (p) {
          res.send("pasword changed");
        }
      }
    }
  });
};

exports.getpasswordchange = (req, res) => {
  res.send("pass change");
};



// Passowrd Verification Using Email Here

// ***************88 Add The Middle Ware here **************8

exports.sendverification = async (req, res) => {
  token = req.params.token;

  User.findById(token).then((user) => {
    console.log(user);

    // check if user is google or already verified
    if ( user.provider == "google") {
      // already verified or google user
      // since we won't show any such option in the UI
      // most probably this is being called by mistake or can be an attack
      // simply redirect to profile
      res.send("hello");
    } else {
      // generate a token
      var token = crypto.randomBytes(32).toString("hex");
      // add that to database
      const tokens = new resetToken({
        token: token,
        email: user.email,
      });
      tokens.save(tokens).catch((err) => {
        res.status(500).send({ message: "Error Sending mail id=" + id });
      });
      // send an email for verification
      mailer.verifyemail(user.email, token);
      res.send({
        firstname: user.firstname,
        verified: user.isVerified,
        emailsent: true,
      });
    }
  });
};

// Verify Email
exports.sendemailverify = async (req, res) => {
  // grab the token

  const token = req.params.token;
  // check if token exists
  // or just send an error
  if (token) {
    var check = await resetToken.findOne({ token: token });
    if (check) {
      // token verified
      // set the property of verified to true for the user
      var userData = await user.findOne({ email: check.email });
      userData.isVerified = true;
      await userData.save();
      // delete the token now itself
      await resetToken.findOneAndDelete({ token: token });
      
      res.send("Login Success Here ");
    } else {
      res.send({
        username: user.username,
        verified: user.isVerified,
        err: "Invalid token or Token has expired, Try again.",
      });
    }
  } else {
    // doesnt have a token
    // I will simply redirect to profile
    
    res.send("Needed Tokens");
  }
};


// Controller For Password Change Is Here 
//   Password reset Using Gmail
exports.passwordreset = async(req, res) => {
  
  // first check the user where he/she is logged from google or local password 

  const email = req.body.email

  var userData = await user.findOne({ email: email });
    console.log(userData);

  
   // not checking if the field is empty or not 
    // check if a user existss with this email
    var userData = await user.findOne({ email: email });
    console.log(userData);
    if (userData) {
        if (userData.provider == 'google') {
            // type is for bootstrap alert types
            res.send( "User exists with Google account. Try resetting your google account password or logging using it");
        } else {
            // user exists and is not with google
            // generate token
            var token = crypto.randomBytes(32).toString('hex');
            // add that to database
            await resetToken({ token: token, email: email }).save();
            // send an email for verification
            mailer.sendResetEmail(email, token);

            res.send( "Rest Email Send Check Your Email");
        }
    } else {
      res.send( "No User Existas");

    }
 

  
};



// get Here Reset Password  Now Reset Password here 
exports.resetpassword = async(req, res) => {

  // Form Data fro post here i can simply post data 
  res.send("password reset here ")
  

}


// Post Reset Data Here 

exports.resetpasswordpost = async(req, res) => {

   const { password, password2, email } = req.body;
  console.log(password);
  console.log(password2);
  if (!password || !password2 || (password2 != password)) {
      res.send("Password not matched ")
  } else {
      // encrypt the password
      var salt = await bcrypt.genSalt(8);
      if (salt) {
          var hash = await bcrypt.hash(password, salt);
          await user.findOneAndUpdate({ email: email }, { $set: { password: hash } });
          res.send('Success password');
      } else {
        res.send("error ")

      }
  }
  

}