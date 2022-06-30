const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const DeckSchema = new Schema({
      name: {type:String,required:false},
      deckName: {type:String,required:false},
      email: {type:String,required:false},
      data: [{}],
      backgroundColor:{type:String, required:false},
      thisDeckCompleted: false, //shows whether the study goal of the particular deck is reached
      color: {type:String,required:false},
      toStudyValue:{type:Number,required:false},
      cardsToday: {type:Number,required:false},
      paused:{type:Boolean,required:false},
      skipPausedCards: {type:Number,required:false},
      pauseMode:{type:Boolean,required:false},   //when active the pause switch can be clicked in question answers when cards are paused
      editModeActive:{type:Boolean,required:false},

//       cardsToday: Number,
//    //   color: colors[Object.keys(dataBase?.DeckNames).length % colors?.length],
//       paused: Boolean,
//       thisDeckCompleted: Boolean, //shows whether the study goal of the particular deck is reached
//       skipPausedCards: Number,
//       pauseMode: Boolean, //when active the pause switch can be clicked in question answers when cards are paused
//       editModeActive: Boolean, //when editModeActive is true, pause switch can t be clicked
     // backgroundColor: String
userPreferences: {
      //  days: {type:Number,required: false},
       backgroundColor: {type:String, required:false},
      //  weeksInRow: {type:Number,required: false},
      //   toReview: {type:Number, required: false}
          }
},{timestamps:true}, {collection: 'decks'}
)

const Deck = mongoose.model('user-decks', DeckSchema)
 module.exports = Deck

 //module helps you to directly access
 //and interact with mongoose

