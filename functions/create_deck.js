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

 const existingDeck =  await Deck.find({email:email, deckName:deckName})
 const newDeck = !existingDeck && await Deck.create({email: email, deckName:deckName,
      data: [23,4,5,6],
      backgroundColor:'blue',
      thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      color: 'blue',
      toStudyValue:0,
      cardsToday:0,
      paused:false,
      skipPausedCards: false,
      pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
      editModeActive:false
  })

if (newDeck) {
    return {
        statusCode: 200,
    }
  } else {   
    return {
        statusCode: 500,
        body:JSON.stringify('Server Error or Deck already exists')
    }
  }  
};
