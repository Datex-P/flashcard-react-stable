//events incoming info about the request itself

exports.handler= async (event, context) => {
  return {
    statusCode: 200,
    body: "hello world!"
  }
}