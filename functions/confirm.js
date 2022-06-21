
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require("mongoose");

exports.handler = async (event) => {

   let token = event.queryStringParameters.token
   
   mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const decoded = jwt.verify(token, process.env.SECRET);
const { email } = decoded;

  if (decoded) {
 
    await User.findOneAndUpdate({email: email}, {verified: 'true'});
    
    return {
        statusCode: 200,
        body:JSON.stringify('Updated in Database')
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Could not be updated in Database')
    }
  }  
};