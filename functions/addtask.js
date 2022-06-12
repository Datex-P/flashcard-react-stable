
const mongoose = require('mongoose')
const Connection  = require('mongoose')
const dbState = require('../server/dbstates.js')
const User = require('../server/models/user')
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');
const mongodb = require("mongodb");


let uri = 'mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority'

let client = new MongoClient(`${uri}`, {
  useNewUrlParser: true
},() => {
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find(f => f.value === state).label, 'to db'); // connected to db
}
);

const clientPromise = client.connect()




exports.handler = async (event, context, callback) => {
 
  context.callbackWaitsForEmptyEventLoop = false;
  
  //const MongoClient = mongodb.MongoClient;
  
 
  
  try {    
   // const clientPromise = await client.connect()

    client = await clientPromise;
    client.db('flashcards').createCollection('hifrommonday')

    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
}