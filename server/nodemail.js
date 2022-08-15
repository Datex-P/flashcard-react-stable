const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function nodemail() {
  console.log('nodemail invoked')

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
      subject: "FlashcardApp -Registration-", // Subject line
      text: "Hello world?", // plain text body
      html: `<meta http-equiv="Content-Security-Policy-Report-Only" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' ; script-src 'self' https://cool-gnome-d84e5e.netlify.app/.netlify/functions  'unsafe-eval';  media-src *"/>
      <div style='background:blue; width:100%; height: 620px; overflow:auto'>
      <div style='margin-left:50px;margin-top:70px'>
      <img src="${process.env.FLASHCARD_LOGO}" alt ='flashcards logo'/>
      <div style='height: 75px; margin-top: 40px; font-size:26px; font-weight:bold; color:seashell'>
        Please Confirm Registration
      </div>
      
      <a href="${process.env.PROVIDER}/confirm/registration?token=${jwt.sign(
        { name: process.env.EMAIL_HOLDER_NAME, email: process.env.EMAIL_RECEIVER_ADRESS },
        process.env.SECRET
      )}" style='color:seashell; text-decoration:none; font-size:15px'>Yes, verify my account.</a>
   
      <div style='color:seashell; margin-top: 30px'>If you received this email by mistake, simply delete it. You won't be
      registered, if you don't click the registration link above.
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

  module.exports = nodemail