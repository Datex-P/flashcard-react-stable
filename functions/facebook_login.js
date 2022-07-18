require('dotenv').config();
const User = require('../server/models/user');
const Deck = require('../server/models/deck');
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
  console.log(decoded_email, 'decoded email here')
  const findUser = await User.findOne({email: decoded_email}).exec();
  const deck = findUser && await Deck.find({email:decoded_email})
 
  console.log(findUser, 'find user here')
  const createUser = !findUser && await User.create({email:decoded_email, backgroundColor:'default'});
  console.log(createUser, 'create user here')

  // if (!findUser && !createUser) {
   
  // }
if (createUser || findUser) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body:JSON.stringify({createUser, deck})
  }
} else {
  return {
    statusCode: 500,
    body: JSON.stringify({1:"server error"})
  };
}
};
