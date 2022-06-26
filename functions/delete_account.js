require('dotenv').config();
//const User = require('../server/models/user');
const Decks = require('../server/models/deck');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

// let {email} = JSON.parse(event.body);
// console.log(email)
let email = true
if (email) {
 
  let deleted = await Decks.deleteMany({email: 'kkkk-email'});
    
    return {
        statusCode: 200,
        body:JSON.stringify(deleted)
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Token corrupted')
    }
  }  
};
