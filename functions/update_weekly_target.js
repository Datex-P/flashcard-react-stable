require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );
 let {weeklyTarget, user} = JSON.parse(event.body)

//rewrite that part

if (weeklyTarget) {
 
    await User.findOneAndUpdate({email:user}, {weeklyTarget:weeklyTarget});
    
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