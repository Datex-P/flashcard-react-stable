require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../server/models/user');
const pwdreset = require('../server/pwdreset.js')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  const {email} = JSON.parse(event.body);
  const user = await User.findOne({email}).exec();
 

  if (user) {

    pwdreset()
   
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Content-Type": "application/json",
      },
      body: 'email exists',
    };
  }
  
  return {
    statusCode: 405,
    body: "Invalid user or password",
  }
  
};
