require("dotenv").config();
const mongoose = require("mongoose");
const Deck = require('../server/models/deck');
const User = require('../server/models/user');


//this function pauses and unpauses the decks

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  //delete open history from decks

  const {email} = JSON.parse(event.body);

  //delete open history here
  const user = await User.findOneAndUpdate({email:email}, {date:[{}]})


    if (user) {
      return {
        statusCode: 200,
       // body: JSON.stringify({3:'it works'})
      }
    }
      return {
        statusCode: 500,
       // body: JSON.stringify({1:'it works'})
      }
};
