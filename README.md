# Serverless template

## About the template
This template provides you with the code needed to deploy a simple 
NodeJS CRUD api built on top the serverless framework: https://serverless.com
You will get a fully functional API that can manage information for a sample
entity, storing the data on a DynamoDB table.

## How to deploy your project
### Pre-requisites
In order to run the project you will need to have:
- An AWS account
- The AWS CLI installed. Instructions here: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html
- An AWS profile configured
- NodeJs 6 or higher installed
- Install the serverless cli. Instructions here: https://serverless.com/framework/docs/getting-started/
- Clone this repository
- Run `npm install`

### Deplying the project
The serverless framework provides a wrapper around AWS CloudFormation 
so it will deploy a CloudFormation stack behind the scenes. In order
to perform the stack deployment run:
`serverless deploy --aws-profile <profile> --stage <stage>`

You will need to replace `<profile>` with your aws profile. If you are
using your default profile you can use:
`serverless deploy --stage <stage>`

You will also need to replace the `<stage>` with the stage you are 
deploying to.

Real example:
`serverless deploy --aws-profile experiments --stage dev`

## Components of the template
### Functions
The compute functionality of the API is provided by AWS Lambda function
that can be found in: `./functions` They are written in JavaScript, although
you can use any of the languages supported by AWS Lambda: https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html

You can register new functions by adding new entries to the `serverless.yml` 
file in the `functions` section.

### Permissions
Your functions may need some permissions in order to interact with AWS 
resources, lets say that you need to support SQS queues. You will need to
add the permissions to the role used by the Lambda functions, that can be
found in the `serverless.yml` file under the name `iamRoleStatements`. As
you can see, the role already has a policy that allows the Lambda functions
to interact with the DynamoDB table provided in the example.

### API Gateway
Although is is abstracted by the serverless frameworks the service in charge 
of exposing your Lambda function to HTTPS endpoints is called AWS API Gateway
and it is a service that makes it easy for developers to create, publish, 
maintain, monitor, and secure APIs at any scale. If you want to learn more 
about how your functions are wired behind the scenes, visit the API Gateway
section of the AWS console.

