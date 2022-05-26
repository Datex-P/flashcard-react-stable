//import env from "../src/env.json";
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose =require("mongoose");
const morgan = require('morgan');
require('dotenv').config()
const nodemailer = require("nodemailer");
const cors = require('cors')
const express = require('express');
const router = express.Router()
const app = express();



const Flashcard = require('./models/flashcards')
// var jwt = require('jsonwebtoken');
let secret = 'moktug56hjtrnhk'
// const DataBase = require('./models/database')
app.use(cors()) //=> middleware means manipulating response and passing it on to next fucntion
app.use(express.json())


//const mongoose = require('mongoose');
// const token = require('jsonwebtoken')
//const { MongoClient } = require("mongodb");

//this part works asynchronously
// app.get('/register2', (req, res)=> {
//   const flashcard= new Flashcard ({
//     title:'new flashcard',
//     snippet: 'about my',
//     body:'more about'
//   })
//   flashcard.save()
//   .then((result)=>{
//     res.send(result)
//   }).catch((err)=>{
//     console.log(err)
//   })
// })




//const dbURI = process.env.MONGO_URL;
const dbURI = `mongodb+srv://mongo123:${process.env.Flashcard_Mongo_Pwd}@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority`
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(3000))
.catch((err)=>console.log(err))




// const uri = 'mongodb+srv:mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   //const collection = client.db("test").collection("devices");
//   //function listDatabases(client) {
//     const collection = client.db("flashcard").collection("flashcard");
//     let res = collection.find({})
//     res.forEach(i=>console.log(i))
//  // }
//   //listDatabases()
//   // perform actions on the collection object

//   //client.close();
// });

async function main() {


  //const uri= "mongodb+srv://flashcard:flashcard123@cluster0.7fwjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const client = new MongoClient(uri)
  try{
  await client.connect();
  console.log(client.isConnected(), 'mongo client is connected')
  } catch(e) {
    console.error(e)
  } finally {
   // await client.close()
  }
  main().catch(console.error)


  // let testAccount = await nodemailer.createTestAccount();

  // // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   // host: "smtp.ethereal.email",
  //   // port: 587,
  //   // secure: false, // true for 465, false for other ports
  //   service:'hotmail',
  //   auth: {
  //     user:'testnodetest@outlook.com',
  //     pass:'node12345'
  //     // user: testAccount.user, // generated ethereal user
  //     // pass: testAccount.pass, // generated ethereal password
  //   },
  // });

  //   transporter.verify((error, success) =>{
  //     if(error) {
  //       console.log(error)
  //     } else {
  //       console.log('ready for messages')
  //       console.log(success)
  //     }
  //   })

  // send mail with defined transport object
//  transporter.sendMail({
//     from: `"Fred Foo 👻" ${process.env.AUTH_EMAIL}`, // sender address
//     to: "fabio.j.weiss@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: `<a href="/confirm_registration?token=${jwt.sign({ name: 'Fred Foo',email:'fabio.j.weiss@gmail.com' }, secret)}">click to verify your email</a>`, // html body
//   }, (err, info)=>{
//     if (err) {
//       return err
     
//     }
//     console.log("Message sent: %s", info);
//     return info.response
//   });

  
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
console.log('hello from serer index')
main()

main().catch(console.error);

// app.get('/confirm_registration',(req,res)=>{
//   let token = req.query.token;
//   const decoded = jwt.verify(token, secret);
//   if(decoded){
//     const {name,email} = decoded
//     //to do db search and update the value
//     //app.put('')
//     mongo.findOneAndUpdate({name:name, email:email, confirmed:false},{confirmed:true})

//   }else{
//     //redirect user to page with message about email confirmation link expiration
//     //and proposal to register again
//   }
// })
app.get('/database/:_id',(req,res)=>{
  // DataBase.findById(req.params._id,(err,d)=>{
  //   if(err){
  //     res.status(403).json({error:'wrong id'})
  //   }else{
  //     res.status(200).json(d)
  //   }
    
  // })
})

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/src/Login/Login.js')
})

app.post('/', (req, res)=>{
  let newFlashcard = new Flashcard({
    title: req.body.login,
    content: req.body.password
  })
  newFlashcard.save()
  res.redirect('/')
})


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


 const dbURI = process.env.MONGO_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true }).then((result)=>console.log('connected')).catch((err)=>console.log(err));
app.listen(4000, ()=>console.log('server is running'))