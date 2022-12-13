
// // const { getMaxListeners } = require("../models/user.model");

// const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: "bezkoder_db",
//             service: "ashishreddy958@gmail.com",
//             port: 587,
//             secure: true,
//             auth: {
//                 user: "ashishreddy958@gmail.com",
//                 pass: "@shishReddy958",
//             },
//         });

//         await transporter.sendMail({
//             from: "ashishreddy958@gmail.com",
//             to: email,
//             subject: subject,
//             text: text,
//         });

//         console.log("email sent sucessfully");
//     } catch (error) {
//         console.log(error, "email not sent");
//     }
// };

// module.exports = sendEmail;