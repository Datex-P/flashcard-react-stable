require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../server/models/user');
const bcrypt = require('bcryptjs')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  );
  
  //let {name, password} = JSON.parse(event.body);
  //console.log(name, password, "data here");
  let {name, password} = JSON.parse(event.body);
 let fd = await new Promise((res,rej)=>User.findOne(
    {
      name: name,
      password: password,
    },
    (err, user) => {
      if (err) {
        rej({
          statusCode: 500,
          body: JSON.stringify({ msg: err.message }),
        });
      } else {

        const match = bcrypt.compare(password, user.password);
        //bcrypt does not run locally
     //   return match
        let statusCode = user && match ?200:405
        res({
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*", 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user}),
        });
      }
    }
  ));
  return fd
};
