//const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../server/models/user')

 await mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
);

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
   
    try{
      const user =  await User.findOne({
        email: 'bbbb'
      })
      if(!user) {
        await User.create({
          name: 'kkk',
          email: 'llll',
          verified: true,
        })
      }
    return {
      statusCode: 200,
      status:"ok",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type":"application/json"
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
}