
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

let token = event.queryStringParameters.token
   
const decoded = jwt.verify(token, process.env.SECRET);
const { email } = decoded;


if (decoded) {
 
    await User.findOneAndUpate({email: email, });
    
    return {
        statusCode: 302,
        headers: {
            "Location": `${process.env.NODE_ENV === 'production' ? 
            'https://cool-gnome-d84e5e.netlify.app': 'http://localhost:8888'}`
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