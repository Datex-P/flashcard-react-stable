require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let { email } = JSON.parse(event.body);
  let decoded_email = decodeURI(email);

  // let user = await new Promise((res, rej) =>
  //   User.findOne({ email: 'kkk-email' }, (err, user) => {
  //     if (err) {
  //       rej(err);
  //     } else {
  //       if (user) {
  //         User.updateOne({ email: 'kkk-email' }, { name: "user found" })
  //       }
  //       res(user);
  //     }
  //   })
  // );
  const findUser = await User.findOne({decoded_email}).exec();
  //const  = user && await User.findOneAndUpdate({email:decoded_email}, {name:'found'});
  const createUser = !findUser && await User.create({email:decoded_email});

  //user-decks has to be created or loaded as well

  if (!findUser && !createUser) {
    return {
      statusCode: 500,
      body: "server error",
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body:JSON.stringify({email:decoded_email})
  };
};
