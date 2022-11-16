# shieldpay-sendSMS

# how it works

POST request with query parameters is made to [APIGateway](https://eu-west-2.console.aws.amazon.com/apigateway/home?region=eu-west-2#/apis/im6l871qoj/resources/xvkq9vvy58) 
-> APIGateway Integrates query parameters into an [SNS topic](https://eu-west-2.console.aws.amazon.com/sns/v3/home?region=eu-west-2#/topics)
-> SNS topic passes messages to a subscribed [SQS queue](https://eu-west-2.console.aws.amazon.com/sqs/v2/home?region=eu-west-2#/queues)
-> The queue triggers a [Lambda function](https://eu-west-2.console.aws.amazon.com/lambda/home?region=eu-west-2#/functions) 
-> Lambda function consumes the message object and sends an SMS via a call to the [SNS js API](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-publishing-messages.html)

# main challenges

### figuring out the structure of the event passed into the lambda function
My  aim was to get the gateway -> queue -> lambda working even if the message parameters were not correctly read.  Once I knew the data was there, I use error logs to read the event object and adjust until it worked fully.

### creating permissions / policies / roles
1. for the lambda to use sns.publish -> any mobile number
2. for the api gateway use sns.publish -> sns

### finding up to date documentation on SNS.publish() parameters
More web searching was required 

### coercing the APIgateway to integrate post requests into correct SNS object format 
If PhoneNumber was specified, then the SMS went to the wrong SNS queue and was sent immediately! TopicArn had to be included as a parameter in the post request, but PhoneNumber needed to be disguised because I needed the payload to reach the lambda function, and THEN read the phone number, so I stored the phone number in the payload "subject" property and then read the payload when it reached the lambda. 

### learning these how these microservices fit together. Learning how to assign AWS roles and policies.

# tests
- one unit test (jest) which requires SAM set up information
- integration test checkpoints:
    - API Gateway -> Cloudwatch
    - API Gateway -> Use Test function
    - SNS -> Cloudwatch
    - SQS -> Inject a message
    - SQS -> Monitoring
    - SNS -> Cloudwatch
    - Lambda -> Cloudwatch
    - SNS -> Text messaging -> Delivery status Logs
    - Mobile Phone
    
- end to end:
    POSTman -> -> -> mobile phone


# other bits

- CI implemented using github action
- includes typescript types 
- implements a jest unit test

# still to do

- local development using AWS SAM 
- assess the security  
- find a github action that moves multiple files
- use webpack

# brief

create an asynchronous service deployed to AWS (using their free trial) that receives an HTTP POST request and ultimately sends an SMS text message.

Your solution should use the following steps:

- Receive an HTTP POST request containing a phone number and message body
- Send the request payload onto an SNS topic
- Gets received by an SQS queue which is subscribed to the SNS topic
- Sends an SMS message via SNS to the phone number provided from a Lambda function that listens for messages on this SQS queue

We would like you to use the following components where possible:

- Typescript
- Jest
- Webpack
- Serverless Framework
- AWS API Gateway
- AWS SNS
- AWS SQS
- AWS Lambda
