'use strict';

module.exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  callback(
    null,
    {
      statusCode: 200,
      body: 'ok',
    }
  );

}
