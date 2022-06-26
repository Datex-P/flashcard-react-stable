const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {required: false},
  name: { required: false},
  password: {required:false}
},{timestamps:true}
)

mongoose.pluralize(null);
const User = mongoose.model('user-data', UserSchema)
 module.exports = User;

 //module helps you to directly access
 //and interact with mongoose

