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

  const {email, deckName} = JSON.parse(event.body);
  Deck.findOneAndUpdate({email:email, deckName:deckName}, (err, deck)=>{
    if (err) {
      return {
          statusCode: 500,
          body: JSON.stringify(err)
        }
    } else if(deck) {
      if (deck.pauseMode === true) {
        deck.pauseMode = false
      } else {
        deck.pauseMode = true
      }
      deck.save()

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", 
          "Content-Type": "application/json",
        },
        body: 'Save successful',
      };
    }  
  })
};
