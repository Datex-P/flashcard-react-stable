require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../server/models/user");
const util=require('util')

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  ;let s=util.inspect(event.body)
  .split(`Content-Disposition: form-data; name`);s.splice(0,1);
  let r=`{"`;s.forEach((e)=>{r+=e.split(`\\r\\n------`)[0]
  .replace(`"\\r\\n\\r\\n`,`":"`).replace(`\': \'"`,``)
  .replace(`=`,``)+`",`});s=r.slice(0,-1)+`}`;console.log(s);

  // const name =  JSON.parse(event.body)
  //console.log(name, 'name here')
  // let body = event.queryStringParameters
  // console.log(event.body.name, 'body name here')
  // console.log(event, 'event here')

  await mongoose.connect(
    `mongodb+srv://mongo123:mongo123@cluster0.m0wvo.mongodb.net/flashcard?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  try {
    //   const {name, password} = await JSON.parse(event.body)
    // console.log(JSON.parse(event.body), "event here");
    console.log(event, 'event here')
    console.debug(event.body, 'event body here')
    console.debug(JSON.stringify(event.body), 'event body here')

    console.log(JSON.parse(JSON.stringify(event.body)), 'evetn')
    //console.log(JSON.stringify(event.body), 'evetn')
    //console.log(JSON.stringify(event.body[0]), 'event body here')
    console.log(event.body.name, 'name here')
    //  const { name,  } = JSON.parse(event.body);
    //  console.log(name, "name here");
    // console.log(password, "password here");
    const user = await User.findOne({
      email: "bbbb",
    });
    if (!user) {
      await User.create({
        name: 'llll'
      });
    }
    return {
      statusCode: 200,
      status: "ok",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Token, append,delete,entries,foreach,get,has,keys,set,values,Authorization",
        "Access-Control-Allow-Credentials": "true",
         "Content-Type": "application/json",
       // "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Max-Age": "2592000",
      },
      body: JSON.stringify({ name: 'kkkk' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
