const uuidV4 = require('uuid/v4');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {
  console.log("Processing...");
  const params = {
    Item: {
      user_id: uuidV4(),
      email: event.email,
      password: event.password
    },
    TableName: "USER_INFO"
  };




  console.log("HERE")
  return docClient.put(params, function (err, data) {
    if (err) {

      let response = {
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('ERROR, email and/or password not allowed.'),
      };
      return response;
    } else {

      let response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify('Successful creation in table.'),

      };
      console.log("RESPONSE", response)
      return response;
    }
  })


};
