require('dotenv').config();
const Deck = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {email, deckName, newDeckName} = JSON.parse(event.body);
 Deck.findOneAndUpdate({email:email, deckName:deckName},null, (err, deck)=>{
  if(deck) {
    deck.deckName = newDeckName
    deck.save()

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Content-Type": "application/json",
      },
      body: 'Save successful',
    };
  } else if (err) {
    return {
        statusCode: 500,
        body: JSON.stringify(err)
      }
  }
})
};

