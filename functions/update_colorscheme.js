require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');


exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );
 let {color, email} = JSON.parse(event.body)

//rewrite that part

if (color) {
 
    await User.findOneAndUpdate({email:email}, {backgroundColor:color});
    
    return {
        statusCode: 200      
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Could not be updated in Database')
    }
  }  
};