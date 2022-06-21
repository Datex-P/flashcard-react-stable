
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

let token = event.queryStringParameters.token
   
const decoded = jwt.verify(token, process.env.SECRET);
const { email, name, password } = decoded;

  if (decoded) {
 
    await User.create({email: email, name:name, password:password});
    
    return {
        statusCode: 302,
        headers: {
            "Location": "https://cool-gnome-d84e5e.netlify.app"
        },
        body:'Redirect in place'
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Could not be updated in Database')
    }
  }  
};