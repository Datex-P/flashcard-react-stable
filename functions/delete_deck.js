require('dotenv').config();
const Deck = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {email, deckName} = JSON.parse(event.body);

if (email) {
  let deleted = await Deck.deleteOne({email: email, deckName:deckName });
    
    return {
        statusCode: 200,
        body:JSON.stringify(deleted)
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Server error')
    }
  }  
};
