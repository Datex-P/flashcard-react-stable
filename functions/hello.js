//events incoming info about the request itself

//event ==>incoming info about the request itself
//request body and headers for instance

//context ==>underlying info about the platform itself

exports.handler= async (event, context) => {
  return {
    statusCode: 200,
    body: "hello world!"
  }
}