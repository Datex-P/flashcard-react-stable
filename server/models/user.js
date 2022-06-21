const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: { required: false},
  // email: {type: String, required: false},
  verified: { required: false}
  // password: {type: String, required: false},
  // background: {type:String, required:false}
},{timestamps:true}
)
mongoose.pluralize(null);
const User = mongoose.model('user-data', UserSchema)
 module.exports = User;

 //module helps you to directly access
 //and interact with mongoose

