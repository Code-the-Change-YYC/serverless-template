'use strict';

const AWS = require('aws-sdk');

module.exports.handler = async event => {

  let retrieveParameters = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      code: event.pathParameters.code
    }
  };

  let retrieveResult = {};

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    retrieveResult = await dynamoDb.get(retrieveParameters).promise();
  }
  catch (retrieveErrors) {
    console.log('Error retrieving record', retrieveErrors);
    console.log('retrieveParameters', retrieveParameters);

    return {
      statusCode: 500
    };
  }

  if (retrieveResult.Item === null ||
    typeof retrieveResult.Item === "undefined") {
    return {
      statusCode: 404
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Retrieved records successfully',
        body: {
          code: retrieveResult.Item.code,
          name: retrieveResult.Item.name
        },
      },
      null,
      2
    ),
  };
};
