'use strict';

const AWS = require('aws-sdk');

module.exports.handler = async event => {

  let scanParameters = {
    TableName: process.env.DYNAMODB_TABLE
  };

  let scanResults = {};

  try {
    let dynamoDb = new AWS.DynamoDB.DocumentClient();
    scanResults = await dynamoDb.scan(scanParameters).promise();
  }
  catch (scanErrors) {
    console.log('Error retrieving records', scanErrors);

    return {
      statusCode: 500
    };
  }

  if (scanResults.Items === null ||
    !Array.isArray(scanResults.Items)) {
    return {
      statusCode: 404
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'List retrieved successfully',
        records: scanResults.Items.map(record => {
          return {
            code: record.code,
            name: record.name
          }
        })
      },
      null,
      2
    ),
  };
};
