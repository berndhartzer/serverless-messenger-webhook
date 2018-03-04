'use strict';

module.exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Get the params from the webhook request
  let mode = event.queryStringParameters['hub.mode'];
  let token = event.queryStringParameters['hub.verify_token'];
  let challenge = event.queryStringParameters['hub.challenge'];

  // Verify request
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {

    console.log('Webhook verified');

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
