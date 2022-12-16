// //   Password reset Using Gmail
// exports.passwordreset = (req, res) => {

//     var nodemailer = require('nodemailer');

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'krazy5625@gmail.com',
//         pass: 'jwhzzqyzklgetxjh'
//       }
//     });

//     var mailOptions = {
//       from: 'ashishreddy958@gmail.com',
//       to: 'swapnil.mukhia08@gmail.com',
//       subject: 'Sending Email using Node.js',
//       text: `Hello `
//       // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//     };

var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krazy5625@gmail.com",
    pass: "jwhzzqyzklgetxjh",
  },
});

module.exports.sendResetEmail = async (email, token) => {
  // change first part to your domain
  var url = "http://localhost:8080/api/auth/reset-password/post?token=" + token;

  await smtpTransport.sendMail({
    from: "krazy5625@gmail.com",
    to: email,
    subject: "RESET YOUR PASSWORD",
    text: `Click on this link to reset your password ${url}`,
    html: `<h3> Click on this link to reset your password : ${url} </h3>`,
  });
};

//  Verify Email here

module.exports.verifyemail = async (email, token) => {
  // change first part to your domain
  var url = "http://localhost:8080/api/auth/verifyemail?token=" + token;

  await smtpTransport.sendMail({
    from: "krazy5625@gmail.com",
    to: email,
    subject: "VERIFY Your EMAIL",
    text: `Click on this link to verify ${url}`,
    html: `<h3> Click on this link to verify your email : ${url} </h3>`,
  });
};
