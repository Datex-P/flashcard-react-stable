
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require("mongoose");

exports.handler = async (event, context, callback) => {

   let url = event.path
   let index = url.indexOf("=");
   let token = event.queryStringParameters.token
   
   mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

 

//    console.log(token, 'token here')
   const decoded = jwt.verify(token, process.env.SECRET);

//   console.log('confirm registration route triggered',decoded)
  
const { email } = decoded;
  if (decoded) {
    console.log(decoded, 'decoded here')

    await User.findOneAndUpdate({email: email}, {verified: 'true'});
  } else {
    console.log('could not update user')
    //redirect user to page with message about email confirmation link expiration
    //and proposal to register again
  }

//     console.log('confirm registration got invoked')
return {
    statusCode: 400,
    body:JSON.stringify(email)
   // body: event.queryStringParameters
}
  
};