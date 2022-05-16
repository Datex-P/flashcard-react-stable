const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
  name: {type: String, required: true},
 // email: {type: String, required: false, unique: true},
  password: {type: String, required: true},

},{timestamps:true}, {collection: 'flashcard-new'}
)

const model = mongoose.model('UserData', User)
 module.exports = model

 //module helps you to directly access
 //and interact with mongoose

