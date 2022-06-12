const { MongoClient } = require('mongodb');


let uri = 'mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'
let client = new MongoClient(`${uri}`, {
  useNewUrlParser: true
}
);

const clientPromise = client.connect()

exports.handler = async (event, context, callback) => {
 
  context.callbackWaitsForEmptyEventLoop = false;
try{

    return  {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
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

