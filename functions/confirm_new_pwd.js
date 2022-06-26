require('dotenv').config();
const User = require('../server/models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt_decode= require('jwt-decode')

exports.handler = async (event) => {
    
    mongoose.connect(`${process.env.MONGO_URI}`,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
   }
 );

 let {token, new_password} = JSON.parse(event.body);
 let {email} = jwt_decode(token);
 const cryptedPassword = await bcrypt.hash(new_password, 10)

if (email) {
 
    await User.findOneAndUpdate({email: email},{password:cryptedPassword});
    
    return {
        statusCode: 200
    }
  } else {
   
    return {
        statusCode: 500,
        body:JSON.stringify('Token corrupted')
    }
  }  
};

// await User.findOneAndUpdate({email: email},{password:new_password},(err)=>{
//   if (err) {
//     return {
//       statusCode: 500,
//       body:JSON.stringify('Token corrupted')
//     } 
//   } else {
//     return {
//       statusCode: 200
//     }
//   }
//  }
// );