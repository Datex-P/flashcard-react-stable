const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'flashcard';
const dbState = require('./server/dbstates.js')


let cachedDb = null;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb;

  const client = await mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true
  },
  () => {
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const queryDatabase = async (db) => {
  const pokemon = await db.collection("users");

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pokemon),
  };
};

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  return queryDatabase(db);
};




// const FaunaService = require('@brianmmdev/faunaservice')
// const faunadb = require('faunadb');
// var q = faunadb.query;

// exports.handler = async (event) => {
//   const q = faunadb.query;
//   const service = new faunadb.Client({
//     secret: 'fnAEovckAeAAyBLY8P68w862WE8G1miNddr56wrE',
//     domain: 'db.eu.fauna.com'
//   });

//   service.query(
//     q.CreateCollection({ name: 'kkkkk' })
//   )
//   .then((ret) => console.log(ret))
//   .catch((err) => console.error(
//     'Error: [%s] %s: %s',
//     err.name,
//     err.message,
//     err.errors()[0].description,
//   ))

 
//};