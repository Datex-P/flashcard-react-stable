const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const TestSchema = new Schema({
  name: { type: Object, required: false},
  password: {type: Object, required: false}
  // email: {type: String, required: false},
  // verified: {type: String, required: false},
  // password: {type: String, required: false},
  // background: {type:String, required:false}
},{timestamps:true}
)
mongoose.pluralize(null);
const Test = mongoose.model('test-data', TestSchema)
 module.exports = Test;

 //module helps you to directly access
 //and interact with mongoose

