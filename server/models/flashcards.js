const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
  name: {type: String, required: true},
 // email: {type: String, required: false, unique: true},
  password: {type: String, required: true},
 // verified: {type: String, required: false}
}, {collection: 'user-data'}
)

const model = mongoose.model('UserData', User)
 module.exports = model

 //module helps you to directly access
 //and interact with mongoose

