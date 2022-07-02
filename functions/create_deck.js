require('dotenv').config();
const Deck = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {email, deckName,backgroundColor} = JSON.parse(event.body);
 console.log(deckName, 'deck name here')
 console.log(email, 'email here')
 console.log(backgroundColor, 'background color here')

 const existingDeck =  await Deck.find({email:email, deckName:deckName})
 const newDeck =  existingDeck.length ===0 && 
 await Deck.create({email: email, deckName:deckName,
      data: [],
      backgroundColor:backgroundColor
      // thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      // color: 'blue',
      // toStudyValue:0,
      // cardsToday:0,
      // paused:false,
      // skipPausedCards: false,
      // pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
      // editModeActive:false
  }, null, (err, deck)=>{
    if (deck) {
      return {
        statusCode: 200,
        //body:JSON.stringify({'Server Error or Deck already exists'})
      }
    } else {
      return {
       statusCode: 500,
    //  body:JSON.stringify('worked fine')
    }
  }
  })
};
