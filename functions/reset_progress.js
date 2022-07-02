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

  const {email, deckName} = JSON.parse(event.body);

  // const FindUser = await User.findOneAndUpdate({email:email})

  // let query = {userPreferences: {weekIn} }
  // FindUser.findOneAndUpdate()

  return User.findOneAndUpdate({email:email}, null, (err, user)=>{
    if (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({3:'it works'})
      }
    } else {
      user.weeklyTarget = 0
      user.save()

      return {
        statusCode: 200,
        body: JSON.stringify({1:'it works'})
      }
    }
  })

  // await Deck.findOneAndUpdate({email:email, deckName:deckName},null, (err, deck)=>{
  //   if(deck) {
  //     if (deck.pauseMode === true) {
  //       deck.pauseMode = false
  //     } else {
  //       deck.pauseMode = true
  //     }
  //     deck.save()

  //     return {
  //       statusCode: 200,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*", 
  //         "Content-Type": "application/json",
  //       },
  //       body: 'Save successful',
  //     };
  //   } else if (err) {
  //     return {
  //         statusCode: 500,
  //         body: JSON.stringify(err)
  //       }
  //   }
  // })
};
