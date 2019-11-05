'use strict';

const AWS = require('aws-sdk');

module.exports.handler = async event => {
  let deleteParameters = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      code: event.pathParameters.code
    }
  };

  let deleteResult = {};

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    deleteResult = await dynamoDb.delete(deleteParameters).promise();
  }
  catch (deleteErrors) {
    console.log('Error deleting record', deleteErrors);

    return {
      statusCode: 500
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Record deleted successfully'
      },
      null,
      2
    ),
  };
};
