'use strict';

const rp = require('request-promise');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

module.exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  const body = JSON.parse(event.body);

  if (body.object === 'page') {

    console.log('Event received');

    // Create array of requests to make by iterating over each entry
    let requests = body.entry.map(entry => {

      let requestDetails;

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhookEvent = entry.messaging[0];
      console.log(webhookEvent);

      // Get the sender PSID
      let senderPsid = webhookEvent.sender.id;
      console.log(`Sender PSID: ${senderPsid}`);

      // Check message type and handler accordingly
      if (webhookEvent.message) {
        requestDetails = handleMessage(senderPsid, webhookEvent.message);
      } else if (webhookEvent.postback) {
        requestDetails = handlePostback(senderPsid, webhookEvent.postback);
      }

      return callSendAPI(senderPsid, requestDetails);
    });

    console.log(`Number of requests: ${requests.length}`);

    Promise.all(requests)
      .then(res => {

        console.log('Resolved all request promises');
        console.log(res);

        callback(
          null,
          {
            statusCode: 200,
            body: 'ok',
          }
        );

      })
      .catch(err => {
        console.error(`Error: ${err}`);

        callback(
          null,
          {
            statusCode: 500,
          }
        );

      });

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
function handleMessage(senderPsid, receivedMessage) {

  let response;

  // Check if the message contains text
  if (receivedMessage.text) {

    // Create the payload for a basic text message
    response = {
      text: `You sent the message: '${receivedMessage.text}'. Now send me an attachment!`
    }

  } else if (receivedMessage.attachments) {

    // Gets the URL of the message attachment
    let attachmentUrl = receivedMessage.attachments[0].payload.url;

    response = {
      attachment: {
        type: 'template',
        payload: {
          'template_type': 'generic',
          elements: [{
            title: 'Is this the right picture?',
            subtitle: 'Tap a button to answer.',
            image_url: attachmentUrl,
            buttons: [
              {
                type: 'postback',
                title: 'Yes!',
                payload: 'yes',
              },
              {
                type: 'postback',
                title: 'No!',
                payload: 'no',
              }
            ],
          }]
        }
      }
    };

  }

  return response;
}

/**
 * Handles messaging_postbacks events
 */
function handlePostback(senderPsid, receivedPostback) {

  let response;

  let payload = receivedPostback.payload;

  if (payload === 'yes') {

    response = {
      text: 'Thanks!'
    };

  } else if (payload === 'no') {

    response = {
      text: 'Oops, try sending another image.'
    };

  }

  return response;
}

/**
 * Sends response messages via the Send API
 */
function callSendAPI(senderPsid, response) {

  // Construct the message body
  let body = {
    recipient: {
      id: senderPsid
    },
    message: response
  };

  let options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      'access_token': PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: body
  };

  return rp(options);
}
