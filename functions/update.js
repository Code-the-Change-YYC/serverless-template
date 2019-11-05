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

  if (typeof body.name === 'undefined') {
    console.log('Missing parameters');
    return {
      statusCode: 400
    };
  }

  let updateParameters = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      code: event.pathParameters.code
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name"
    },
    ExpressionAttributeValues: {
      ":name": {
        S: body.name
      }
    }
  };

  let updateResult = {};

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    updateResult = await dynamoDb.update(updateParameters).promise();
  }
  catch (updateErrors) {
    console.log('Error updating record', updateErrors);

    return {
      statusCode: 500
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Item updated successfully'
      },
      null,
      2
    ),
  };
};
