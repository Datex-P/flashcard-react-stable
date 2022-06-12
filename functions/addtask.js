//const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../server/models/user')


// let client = new MongoClient(`${process.env.MONGO_URI}`, {
//   useNewUrlParser: true
// }
// );
let client = await mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
);

//const clientPromise = client.connect()

exports.handler = async (event, context, callback) => {
 console.log(event, 'event var here')
 console.log(context, 'context var here')
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
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
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