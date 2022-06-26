const User = require('../server/models/user');
const mongoose = require('mongoose');


exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

let {email} = JSON.parse(event.body)
console.log(email, 'email here')
let decoded_email = decodeURI(email)

const user = await User.findOne({email:decoded_email}).exec();
const match = user && await User.updateOne({email: decoded_email}, {yeah: 'user found'})
const match2 = !user && await User.create({email: decoded_email}); 

if (!match && !match2) {
  return {
    statusCode: 405,
    body: "Invalid user or password",
  }
}

return {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*", 
    "Content-Type": "application/json",
  },
  //pass user data along as well
  body: email,
};



// User.findOne({email:email}, (err, found) => {

//   if (!found) {
//      User.create({email: email}); 
//   } else if (found) {
//      User.updateOne({email: email}, {yeah: 'user found'})
//   }
//   if (err) {
//     return err
//   }

// })
 
   
};