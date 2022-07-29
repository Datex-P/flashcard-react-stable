require("dotenv").config();
const mongoose = require("mongoose");
const Deck = require('../server/models/deck');

//this function pauses and unpauses the decks

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  const {email} = JSON.parse(event.body);

  const updateDecks = await Deck.updateMany({email:email},{$set:{"data.$[].openHistory":[]}})
  
    if (updateDecks) {
      return {
        statusCode: 200,
      }
    }
      return {
        statusCode: 500,
      }
};
