const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose')


// let client = new MongoClient(`${process.env.MONGO_URI}`, {
//   useNewUrlParser: true
// }
// );
let client = await mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
);

const clientPromise = client.connect()

exports.handler = async (event, context, callback) => {
 console.log(event, 'event var here')
 console.log(context, 'context var here')
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {    
    client = await clientPromise;
    client.db('flashcards').collection('hifrommonday').insertOne({
      item: 'canvas',
      qty: 100,
      tags: ['cotton'],
      size: { h: 28, w: 35.5, uom: 'cm' }
    })

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
        "Content-Type":"application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
}