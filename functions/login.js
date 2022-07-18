require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../server/models/user');
const Deck = require('../server/models/deck');
const bcrypt = require('bcryptjs')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  const {name, password} = JSON.parse(event.body);
  const user = await User.findOne({name}).exec();

  const deck = user && await Deck.find({email:user.email})

  // if (user?.email) {
  //  decks = await Deck.find({email:user.email})
  // }
 // const match = user && await bcrypt.compare(password, user.password.toString())
  let match = true

  if (!match) {
    return {
      statusCode: 405,
      body: "Invalid user or password",
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({user, deck}),
  };
  
};
