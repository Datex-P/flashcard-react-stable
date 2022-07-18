const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  email: {type:String, required: false},
  name: {type:String, required: false},
  password: {type:String, required:false},
  backgroundColor: {type:String, required:false}, //bg that is shown after login
  weeklyTarget: {type:Number, required:false},
  studyTime:{type:Number, required:false},
  hourlyBreakdown:{type:String, required:false},
  userPreferences:{
    days:{type:Number, required:false},
    backgroundColor:{type:String, required:false},
    weeksInRow:{type:Number, required:false},
    toReview:{type:Number, required:false}
  },
  daysOfStudyThisWeek:{type:String, required:false},
  deckCompleted:{type:Number, required:false}
},{timestamps:true}
)

mongoose.pluralize(null);
const User = mongoose.model('user-data', UserSchema)
 module.exports = User;

 //module helps you to directly access
 //and interact with mongoose

