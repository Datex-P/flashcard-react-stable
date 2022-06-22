require("dotenv").config();
const mongoose = require("mongoose");
const Test = require('../server/models/test');
const bcrypt = require('bcryptjs')

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  let data = JSON.parse(event.body);
  console.log(data, "data here");
 let fd = await new Promise((res,rej)=>Test.findOne(
    {
      name: data.name,
      password: data.password,
    },
    (err, user) => {
      if (err) {
        rej({
          statusCode: 500,
          body: JSON.stringify({ msg: err.message }),
        });
      } else {

        const match = bcrypt.compare(data.password, user.password);

        let statusCode = user && match?200:405
        res({
          statusCode,
          headers: {
            "Access-Control-Allow-Origin": "*", 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match}),
        });
      }
    }
  ));
  return fd
};
