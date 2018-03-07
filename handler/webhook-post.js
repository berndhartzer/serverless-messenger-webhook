'use strict';

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

}
