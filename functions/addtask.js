const { MongoClient } = require('mongodb');


let uri = 'mongodb+srv://...flashcard?retryWrites=true&w=majority'
let client = new MongoClient(`${uri}`, {
  useNewUrlParser: true
}
);

const clientPromise = client.connect()

exports.handler = async (event, context, callback) => {
 
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