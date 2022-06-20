require("dotenv").config();
const mongoose = require("mongoose");
const Test = require('../server/models/test');

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
        let statusCode = user?200:405
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
