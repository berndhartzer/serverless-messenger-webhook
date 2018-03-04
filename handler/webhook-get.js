'use strict';

module.exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  let mode = event.queryStringParameters['hub.mode'];
  let token = event.queryStringParameters['hub.verify_token'];
  let challenge = event.queryStringParameters['hub.challenge'];

  console.log(mode);
  console.log(token);
  console.log(challenge);

  if (mode && token && token === notSoSecretToken) {

    callback(
      null,
      {
        statusCode: 200,
        body: challenge,
      }
    );

  } else {

    callback(
      null,
      {
        statusCode: 403,
      }
    );

  }

}
