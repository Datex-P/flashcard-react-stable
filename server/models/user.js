const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {type: String, required: true},
  name: {type: String, required: true},
  password: {type:String, required:true}
},{timestamps:true}
)
mongoose.pluralize(null);
const User = mongoose.model('user-data', UserSchema)
 module.exports = User;

 //module helps you to directly access
 //and interact with mongoose

