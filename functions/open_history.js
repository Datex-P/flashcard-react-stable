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

  const {email, deckName, newRandomQuestion} = JSON.parse(event.body);
  console.log(email, 'email')
  console.log(deckName, 'deckname')
  console.log(newRandomQuestion, 'new random quesiton')
  //delete open history here4
  //how to use set correctly?

 const user = await Deck.findOneAndUpdate({email:email, deckName:deckName}, {$set:{["data."+newRandomQuestion+".openHistory"]:['hi']}})
//const user = true

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
