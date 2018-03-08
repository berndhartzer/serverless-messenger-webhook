'use strict';

const rp = require('request-promise');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  const body = JSON.parse(event.body);

  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(entry => {

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check message type and handler accordingly
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }

    });

    callback(
      null,
      {
        statusCode: 200,
        body: 'EVENT_RECEIVED',
      }
    );

  } else {

    // Return a '404 Not Found' if event is not from a page subscription
    callback(
      null,
      {
        statusCode: 404,
      }
    );

  }

}

/**
 * Handles messages events
 */
function handleMessage(sender_psid, received_message) {

  let response;

  // Check if the message contains text
  if (received_message.text) {

    // Create the payload for a basic text message
    response = {
      'text': `You sent the message: '${received_message.text}'. Now send me an image!`
    }
  }

  callSendAPI(sender_psid, response);
}

/**
 * Handles messaging_postbacks events
 */
function handlePostback(sender_psid, received_postback) {

}

/**
 * Sends response messages via the Send API
 */
function callSendAPI(sender_psid, response) {

  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };

  let options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      'access_token': PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: request_body
  };

  rp(options)
    .then(res => {
      console.log('Message sent');

    })
    .catch(err => {
      console.error(`Unable to send message: ${err}`);

    });

}
