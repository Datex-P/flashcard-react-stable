
const faunadb = require('faunadb');
var q = faunadb.query;
const mongoose = require('mongoose')
const dbState = require('../server/dbstates.js')
const User = require('../server/models/user')
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const mongodb = require("mongodb");

// async function getData() {
//   const uri ='mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'
//   const client = mongoose.createConnection(uri, {
//     useNewUrlParser: true
//   },() => {
//     const state = Number(mongoose.connection.readyState);
//     console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
//   });
//   // new MongoClient(uri, {
//   //   useNewUrlParser: true,
//   //   useUnifiedTopology: true
//   // });

//   try {
//    const test = await client.connect();
//     test
//       .db('flashcard')
//       .collection('UserDecks')
//       .findOneAndUpdate({userName: 'Fabian1'}, {paused: true })
    
//       return test;
//   } catch (err) {
//     console.log(err); // output to netlify function log
//   } finally {
//     await client.close();
//   }
// }

exports.handler = async (event, context, callback) => {
 
  let uri = 'mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'
  context.callbackWaitsForEmptyEventLoop = false;
  try {

const MongoClient = mongodb.MongoClient;

let db = await mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true
}
);

// (err,connectedClient) => {
//   const state = Number(mongoose.connection.readyState);
//   console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db

//   // () => {
//     if(err){
//         throw err;
//     }
    //connectedClient will be the connected instance of MongoClient
  db('flashcards').createCollection('newestcollection')
    .then(r => {
        console.log(r);
    }).catch(e => {
        console.error(`ERROR:`,e);
    })

}

// MongoClient.connect(uri,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// },(err,connectedClient) => {
//     if(err){
//         throw err;
//     }
//     //connectedClient will be the connected instance of MongoClient
//     db = connectedClient.db('flashcards');
//     //now you can write queries

//   db.createCollection('blablabl')
//     .then(r => {
//         console.log(r);
//     }).catch(e => {
//         console.error(`ERROR:`,e);
//     })

// })

    // let conn = await mongoose.connect(`${uri}`, {
    //   useNewUrlParser: true
    // },
    // () => {
    //   const state = Number(mongoose.connection.readyState);
    //   console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
    // })

    // await conn.db('flashcard').collection('UserDecks').findOneAndUpdate({userName: 'Fabian1'}, {paused: true })
    return {
      statusCode: 200,
      body: JSON.stringify({3: `llll`})
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
  
  // return {
  //   statusCode: 200,
  //   headers: {
  //     "Access-Control-Origin":"*",
  //     "Access-Control-Allow-Headers":"Authorization, Content-Type"
  //   },
  //  // body:JSON.stringify(test)
  // }
// } catch(error) {
//   console.log(error, 'erore here')
// }
  }


// } catch(error) {
//   console.log(error, 'error here')
// }


// const service = new faunadb.Client({
  //   secret: 'fnAEovckAeAAyBLY8P68w862WE8G1miNddr56wrE',
  //   domain: 'db.eu.fauna.com'
  // });

  // service.query(
  //   q.CreateCollection({ name: 'kkkkk' })
  // )
  // .then((ret) => console.log(ret))
  // .catch((err) => console.error(
  //   'Error: [%s] %s: %s',
  //   err.name,
  //   err.message,
  //   err.errors()[0].description,
  // ))
  // mongoose.connect(`${process.env.MONGO_URI}`, {
  //   useNewUrlParser: true
  // },
  // () => {
  //   const state = Number(mongoose.connection.readyState);
  //   console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
  // });