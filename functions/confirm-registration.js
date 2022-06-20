
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.handler = async (event, context, callback) => {

  
    console.log('confirm registration got invoked')
  
    return {
        statusCode: 400,
        body: "Oops"
    }
};