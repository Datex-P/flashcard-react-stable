const mongoose = require('mongoose')

let uri = 'mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'

let client = mongoose.connect(`${uri}`, {
  useNewUrlParser: true
});

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
    });

    return {
      statusCode: 200,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
}