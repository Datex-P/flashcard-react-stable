require("dotenv").config();
const mongoose = require("mongoose");
const Test = require("../server/models/test");

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  // const name =  JSON.parse(event.body)
  //console.log(name, 'name here')
  // let body = event.queryStringParameters
  // console.log(event.body.name, 'body name here')
  //  console.log(event, 'event here')
  console.log(event.body, "event body here");
  // console.log(JSON.parse(event.body), 'event body here')

  //  console.log(JSON.parse(event.body.name), 'evetn body name here');
  //  let name = JSON.parse(event.body.name)
  //  console.log(name, 'name here')
  // console.log(event.body.name, 'evetn name here')
  mongoose.connect(
    `mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  let data = JSON.parse(event.body);
  // console.log(hi.name, 'hi name here')
  // console.log(hi, 'hi here')
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
        res({
          statusCode: 200,
          //status: `${user ? "ok" : "not found"}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            // "Access-Control-Allow-Headers": "Content-Type, X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
            // "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            // "Accept":"application/json",
            // "Access-Control-Max-Age": "2592000"
          },
          body: JSON.stringify({ user}),
        });
      }
    }
  ));
  return fd
  //console.log(user, "user here");
  //   if(!user) {
  //    await User.create({
  //      name: name,
  //      verified: true
  //    })
  //  }

  // let result =
  //     await Test.create({
  //       name: hi.name,
  //       email: 'bbb'
  //       //email: req.body.email,
  //       //verified: true,
  //     })

  // if (user) {
  //   return
  // }

  //   return {
  //     statusCode: 200,
  //     status:`${user? 'ok': 'not found'}`,
  //     headers: {
  //       // "Access-Control-Allow-Origin": "*",
  //       // "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //       // "Access-Control-Allow-Headers": "Content-Type, X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
  //       // "Access-Control-Allow-Credentials": "true",
  //       "Content-Type":"application/json",
  //       // "Accept":"application/json",
  //       // "Access-Control-Max-Age": "2592000"
  //     },
  //     body: JSON.stringify({ hi:'123'})
  //   }
  // } catch (err) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err.message })
  //   };
  // }
};
