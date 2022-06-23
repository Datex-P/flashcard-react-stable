const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.handler = async (event) => {

  let {email, name, password} = JSON.parse(event.body);
  console.log(email, name, password)

    const transporter = nodemailer.createTransport({
        //host: process.env.MAIL_HOST,
        host:'smtp-mail.outlook.com',
        port:  465 || 587,
        service: "hotmail",
        secure: false,
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PWD
        }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("ready for messages");
        console.log(success);
      }
    });

    let info = await transporter.sendMail(
      {
        from: `"Flashcard App 👋" ${process.env.AUTH_EMAIL}`, // sender address
        to: `${email}`, // list of receivers
        subject: "FlashcardApp Registration", // Subject line
        text: "Hello world?", // plain text body
        html: `<div style='background:rgb(90, 170, 149); width:100%; height: 620px; overflow:auto'>
        <div style='margin-left:50px;margin-top:70px'>
        <img src="${process.env.FLASHCARD_LOGO}" alt ='flashcards logo'/>
        <div style='height: 75px; margin-top: 40px; font-size:26px; font-weight:bold; color:seashell'>
          Please Confirm Registration
        </div>
        <button style='width: 200px; height: 50px; border-radius: 5px; background: sandybrown'>
        <a href="${process.env.PROVIDER}/confirm/registration?token=${jwt.sign(
        { name: name, email: email, password:password },
        process.env.SECRET
        )}" style='color:seashell; text-decoration:none; font-size:15px'>Yes, verify my account.</a>
        </button>
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
      })


    if (info.messageId) {
        return {
            statusCode: 200,
            body: nodemailer.getTestMessageUrl(info)
        }
    }
  
    return {
        statusCode: 400,
        body: "Something went wrong"
    }
};