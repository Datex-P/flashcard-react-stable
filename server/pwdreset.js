const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
//require('dotenv').config();
//require('dotenv').config()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
console.log(path.resolve(__dirname, '../.env'), 'path')
//https://stackoverflow.com/questions/42335016/dotenv-file-is-not-loading-environment-variables

async function pwdreset() {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service: "hotmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PWD,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("ready for messages");
      console.log(success);
    }
  });

  transporter.sendMail(
    {
      from: `"Flashcard App 👋" ${process.env.AUTH_EMAIL}`, // sender address
      to: process.env.EMAIL_RECEIVER_ADRESS, // list of receivers
      subject: "FlashcardApp -Password Reset-", // Subject line
      text: "Hello world?", // plain text body
      attachments: [
        // { filename: 'profile.png', path: 'https://m.media-amazon.com/images/I/814XeDdJPCL._AC_SX425_.jpg',
        //  cid: 'unique@kreata.ee'
        // //  <img src="cid:unique@kreata.ee" alt ='flashcards logo'/>
        // }
     ], 
      html: `<div style='background:rgb(90, 170, 149); width:100%; height: 620px; overflow:auto'>
      <div style='margin-left:50px;margin-top:70px'>
      <img src="${process.env.FLASHCARD_LOGO}" alt ='flashcards logo'/>
      <div style='height: 75px; margin-top: 40px; font-size:26px; font-weight:bold; color:seashell'>
        Password Reset
      </div>
      <button style='width: 200px; height: 50px; border-radius: 5px; background: sandybrown'>
      <a href='${process.env.PROVIDER}/new_password?token=${jwt.sign(
        { email: process.env.EMAIL_RECEIVER_ADRESS },
        process.env.SECRET
      )}' style='color:seashell; text-decoration:none; font-size:15px'>Yes, please reset my password.</a>
      </button>
      <div style='color:seashell; margin-top: 30px'>If you received this email by mistake, simply delete it.
      <div style='margin-top:30px'>
        For questions about this list, please contact:
       <div style='margin-top: 5px; text-decoration:none; color:seashell'>
        ${process.env.EMAIL_CONTACT_ADRESS}
       </div> 
      </div>
      </div>
      </div>
      </div>
      `,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: ok");//response.message
       }
       transporter.close()
     // console.log("Message sent: %s", info);
      //return info.response;
    });
  }

  module.exports = pwdreset