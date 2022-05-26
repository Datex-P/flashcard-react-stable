  //import {dbState} from './dbstates.js'
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/flashcards')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
 const dbState = require('./dbstates.js')

// CORS is a way to whitelist requests to 
// your web server from certain locations, 
// by specifying response headers like 
// 'Access-Control-Allow-Origin'. 
// It's an important protocol for making 
// cross-domain requests possible, in cases
//  where there's a legitimate need to do 
//  so.
//llll
app.use(cors()) //manipulates response and passes on to next function
app.use(express.json()) //parses anything that comes from express as json
mongoose.connect('mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority')

//sets correct headers on the response so that is 
//not a cross origin

app.post('/register', async (req, res)=>{
  console.log(req.body)
  try {
    const cryptedPassword = await bcrypt.hash(req.body.password, 10)
    await User.create({
      name: req.body.name,
      password: cryptedPassword,
    })
    res.json({status: 'ok'})
  } catch (err) {
    console.log(err, 'err here')
    res.json({status:'error', error: 'Duplicate email'})
  }
 // res.json({status:'ok'})
})

app.post('/login', async (req, res)=>{

    // const token = req.headers['x-access-token']
 try{
    // try {
    //   const decoded = jwt.verify(token, 'secret123')
    //   const email = decoded.email
    // } catch (error) {
    //   console.log(error)
    //   res.json({status:'error', error:'invalid token'})
    // }
  
    const user =  await User.findOne({
      name: req.body.name,
    })

    if(!user) {
      return res.json({status: 'error', error: 'Invalid login'})
    }

    console.log(user, 'user here')

    const isPasswordValid = true
    
    //= await bcrypt.compare(req.body.password, user.password)

    if (user) {

      const token = jwt.sign({
        name: user.name,
        password: user.password
      }, 'secret123')
      return res.json({status:'ok', user:token})
    } else {
      return res.json({status:'ok', user:false}) 
    }

 } catch(error) {
   console.log(error, 'error here')
  //  console.warn(xhr.responseText)
 }
})

// var dbState = [{
//   value: 0,
//   label: "disconnected "
// },
// {
//   value: 1,
//   label: "connected "
// },
// {
//   value: 2,
//   label: "connecting"
// },
// {
//   value: 3,
//   label: "disconnecting"
// }];


app.listen(4000, ()=>{
  console.log('server started')
})

console.log(mongoose.connection.readyState, 'mongoose connection');



mongoose.connect('mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority', {
  useNewUrlParser: true
},
() => {
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find(f => f.value === state).label, "to db"); // connected to db
});
