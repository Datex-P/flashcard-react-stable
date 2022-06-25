
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


if (decoded) {
    
    return {
        statusCode: 302,
        headers: {
            "Location": 
            //`${process.env.NODE_ENV === 'production' ? 
           // `https://cool-gnome-d84e5e.netlify.app/new_password/${token}`:
             `http://localhost:8888/new_password/${token}`
            //}`
        },
        body:decoded
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Could not be updated in Database')
    }
  }  
};