require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../server/models/user');
const bcrypt = require('bcryptjs')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );

  const {name, password} = JSON.parse(event.body);
  const user = await User.findOne({name}).exec();
  const match = user && await bcrypt.compare(password, user.password.toString())

  if (!match) {
    return {
      statusCode: 405,
      body: "Invalid user or password",
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user}),
  };
  
};
