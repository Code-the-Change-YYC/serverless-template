'use strict';

const AWS = require('aws-sdk');

module.exports.handler = async event => {

  let body = {};

  try {
    body = JSON.parse(event.body);
  }
  catch (parsingError) {
    console.log('Error parsing request body', parsingError);
    return {
      statusCode: 400
    }
  }

  if (typeof body.code === 'undefined' ||
    typeof body.name === 'undefined') {
    console.log('Missing parameters');
    return {
      statusCode: 400
    };
  }

  let insertParameters = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      code: body.code,
      name: body.name
    }
  };

  let insertResult = {};
  
  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    insertResult = await dynamoDb.put(insertParameters).promise();
  }
  catch (insertError) {
    console.log('Error inserting record', insertError);

    return {
      statusCode: 500
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Record inserted'
      },
      null,
      2
    ),
  };
};
