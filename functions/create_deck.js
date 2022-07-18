require('dotenv').config();
const Deck = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {email, deckName,backgroundColor} = JSON.parse(event.body);
 console.log(deckName, 'deck name here')
 console.log(email, 'email here')
 console.log(backgroundColor, 'background color here')

 const existingDeck =  await Deck.find({email:email, deckName:deckName}).exec()
 console.log(existingDeck, 'existing deck here')
 console.log(existingDeck.length, 'deck length') 
 
 const newDeck = existingDeck.length ===0 && await Deck.create(
  {email: email, deckName:deckName,
          data: [{
                    question: `question11`,
                    answer: `answer11`,
                    paused: false
                    }],
          backgroundColor:backgroundColor
          // thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
          // color: 'blue',
          // toStudyValue:0,
          // cardsToday:0,
          // paused:false,
          // skipPausedCards: false,
          // pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
          // editModeActive:false
 })

 if (newDeck) {
  return {
    statusCode: 200,
    body:JSON.stringify({1:'it works'})
  }
 }

 return {
  statusCode: 500,
  body: JSON.stringify({1:'error here'})
 }

//  existingDeck.length ===0 && 
// Deck.create({email: email, deckName:deckName,
//       data: [{
//                 question: `question11`,
//                 answer: `answer11`,
//                 paused: false
//                 }],
//       backgroundColor:backgroundColor
//       // thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
//       // color: 'blue',
//       // toStudyValue:0,
//       // cardsToday:0,
//       // paused:false,
//       // skipPausedCards: false,
//       // pauseMode:false,   //when active the pause switch can be clicked in question answers when cards are paused
//       // editModeActive:false
//   },  (err, deck)=>{
//     if (!err) {
//     return {
//       statusCode:200,
//       body:JSON.stringify({1:'it works'})
//     }
//   }
//     // if(err) {
//     //   return {
//     //     statusCode:500,
//     //     body:JSON.stringify ({1:'error here'})
//     //   }
//     // }
//     //   return {
//     //     statusCode:200,
//     //     body:JSON.stringify({1:'it works'})
//     //   }
//   })
};
