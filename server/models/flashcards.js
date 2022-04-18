const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//schema defines structure of document
//model surrounds it 

const flashcardSchema = new Schema({
  title: {
    type:String,
    required: true
  },
  snippet: {
    type:String,
    required: true
  },
  body: {
    type:String,
    required:true
  }
}, {timestamps:true});

const Flashcard = mongoose.model('Flashcard', flashcardSchema)
module.exports = Flashcard;

//timestamps automatically creates timestamps