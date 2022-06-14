require('dotenv').config();
const mongoose = require('mongoose')
const User = require('../server/models/user')

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
 // const name =  JSON.parse(event.body)
  //console.log(name, 'name here')
  // let body = event.queryStringParameters
  // console.log(event.body.name, 'body name here')
  // console.log(event, 'event here')



  await mongoose.connect(`mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  }
  );
  
  try{
 //   const {name, password} = await JSON.parse(event.body)
 console.log(JSON.parse(event.body), 'event here')
    
 const {name, password} = JSON.parse(event.body)
        console.log(name, 'name here')
         console.log(password, 'password here')
       console.log(event.body.name, 'name here')
       const user =  await User.findOne({
         email: 'bbbb'
       })
       if(!user) {
        await User.create({
          name: name,
          verified: true
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
        "Content-Type":"application/json",
        "Access-Control-Max-Age": "2592000",
      },
      body: JSON.stringify({ name: name, email: password }) 
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) 
    };
  }
}