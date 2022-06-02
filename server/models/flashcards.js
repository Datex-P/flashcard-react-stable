const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: false, unique: true},
  verified: {type: String, required: false},
  password: {type: String, required: true},

},{timestamps:true}, {collection: 'user'}
)

const User = mongoose.model('UserData', UserSchema)
 module.exports = User

 //module helps you to directly access
 //and interact with mongoose

