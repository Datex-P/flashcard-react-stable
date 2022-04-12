const mongoose =require("mongoose");
require('dotenv').config()
const cors = require('cors')
const express = require('express');
const app = express();
// const DataBase = require('./models/database')
app.use(cors())
app.use(express.json())
//const mongoose = require('mongoose');
// const token = require('jsonwebtoken')
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    service:'hotmail',
    auth: {
      user:'testnodetest@outlook.com',
      pass:'node12345'
      // user: testAccount.user, // generated ethereal user
      // pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
 transporter.sendMail({
    from: '"Fred Foo 👻" testnodetest@outlook.com', // sender address
    to: "fabio.j.weiss@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }, (err, info)=>{
    if (err) {
      return err
     
    }
    console.log("Message sent: %s", info);
    return info.response
  });

  
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

// app.get('/database/:_id',(req,res)=>{
//   // DataBase.findById(req.params._id,(err,d)=>{
//   //   if(err){
//   //     res.status(403).json({error:'wrong id'})
//   //   }else{
//   //     res.status(200).json(d)
//   //   }
    
//   // })
// })
// app.put('/database/:_id',(req,res)=>{
//   DataBase.where({_id:req.params._id}).update(req.body,(err,d)=>{
//     if(err){
//       res.status(403).json({error:'wrong id'})
//     }else{
//       res.status(200).json(d)
//     }
    
//   })
// })
// app.post('/database/:user',(req,res)=>{
//   DataBase.create(req.body).then(d=>res.json(d))
// })

// import mongoose = require("mongoose");

// const mongoose = require('mongoose')
// connect to mongo
//const dbURI = process.env.MONGO_URL;
//mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true }).then((result)=>console.log('connected')).catch((err)=>console.log(err));
app.listen(4000, ()=>console.log('server is running'))