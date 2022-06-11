const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dbState = require('./dbstates.js')
require('dotenv').config();
const nodemail = require('./nodemail.js')
const pwdreset = require('./pwdreset.js')
const Deck = require('./models/deck');
const path = require('path')

app.use(cors()) //manipulates response and passes on to next function
app.use(express.json()) //parses anything that comes from express as json

//sets correct headers on the response so that is 
//not a cross origin

app.post('/register', async (req, res)=>{
  console.log('hello from register')
  return res.json({status: 'ok'})
  // try {
  //   const cryptedPassword = await bcrypt.hash(req.body.password, 10)
  //   await User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     verified: false,
  //     password: cryptedPassword,
  //   })
  //   res.json({status: 'ok'})
  //   nodemail()   //how to check if res.json is really ok? put in if statement somehow
  //   //res.json({status:'message send'})
  // } catch (err) {
  //   console.log(err, 'err here')
  //   res.json({status:'error', error: 'Duplicate email'})
  // }
})

app.post('https://cool-gnome-d84e5e.netlify.app/login', async (req, res)=>{
 try{
    const user =  await User.findOne({
      name: req.body.name,
    })
    if(!user) {
      return res.json({status: 'error', error: 'Invalid login'})
    }
    //= await bcrypt.compare(req.body.password, user.password)
    if (user) {
      const token = jwt.sign({
        name: user.name,
        password: user.password
      }, process.env.JWT_SIGN_SECRET)
      return res.json({status:'ok', user:token})
    } else {
      return res.json({status:'ok', user:false}) 
    }
 } catch(error) {
   console.log(error, 'error here')
 }
})

app.post('/facebook', async (req, res)=>{
  try{
    const user =  await User.findOne({
      email: req.body.email
    })
    if(!user) {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        verified: true,
      })
      return res.json({status: 'user created'})
    } else {
      return res.json({status: 'user found'})
    }
  } catch (error) {
    console.log(error, 'error here')
  }
})

app.post('/generate_deck', async (req, res)=> {
  try{
    await Deck.create({
      userName: req.body.username,
      deckName: req.body.deckname,
      data: [],
      cardsToday: 0,
   //   color: colors[Object.keys(dataBase?.DeckNames).length % colors?.length],
      paused: false,
      thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      skipPausedCards: 0,
      pauseMode: false, //when active the pause switch can be clicked in question answers when cards are paused
      editModeActive: false
    });
    res.json({status:'deck-created'})
  } catch(error) {
    console.log(error, 'generate Deck error')
  }
})

app.post('/add_to_deck', async (req, res)=> {
  try {
    console.log(req.body, 'req body')
    let find =  await Deck.updateOne(
      {username: req.body.username
      ,deckname: req.body.nameOfTopDeck}, 
        {$push: {data: [{question: req.body.data[0].question, 
                 answer: req.body.data[0].answer
        }  
      ]}
    }      
    )
      console.log(find, 'find here')
  } catch(error) {
    console.log(error, 'add to deck')
  }
})

app.get('/confirm_registration', (req, res) => {
  let token = req.query.token;

  const decoded = jwt.verify(token, process.env.Secret);
  console.log('confirm registration route triggered',decoded)

  if (decoded) {
    const { email } = decoded;
    console.log(decoded, 'decoded here')

    User.findOneAndUpdate({email: email}, {verified: true },(...e)=>{
      console.log(e)
    });
  } else {
    console.log('could not update user')
    //redirect user to page with message about email confirmation link expiration
    //and proposal to register again
  }
});

app.get('/new_pwd', (req, res) => {
  let token = req.query.token;
  const decoded = jwt.verify(token, process.env.Secret);
  console.log('confirm registration route triggered',decoded)

  if (decoded) {
    console.log(decoded, 'decoded here')
    res.writeHead(302, {
      Location: `${process.env.PROVIDER_FRONTEND}/new_password/${token}`
  });
  res.end();
}
});


app.post('/confirm_new_pwd', async (req, res) => {
  try{ 
     await User.updateOne(
    {email: req.body.email // how to find email of user
    }, {password: req.body.password
      }) 
      return res.json({status:'ok'}) 
    } catch (error) {
    console.log(error, 'error here')
  } 
}    
);

app.post('/password_reset', async (req, res)=>{
  try{
    let user = await User.findOne({
    email: req.body.email
  })
  if (user) {
    pwdreset()
    return res.json({status: 'email exists'})
  } else {
    return res.json({status: 'email does not exist'})
  }
} catch(error) {
  console.log(error, 'erorr here')
}
})

app.post('/', (req, res) => {
  let newUser = new User({
    title: req.body.login,
    content: req.body.password,
  });
  newUser.save();
  res.redirect('/');
});


app.listen(process.env.PORT || 3001, ()=>{
  console.log('server started')
})

console.log(mongoose.connection.readyState, 'mongoose connection');

app.use(express.static(path.join(__dirname, 'src/build')))
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, 'src/build', 'index.html'))
})

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true
},
() => {
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
});
