import { SNS }  from 'aws-sdk';

exports.handler = function(event, context) {
    var eventText = JSON.stringify(event, null, 2);
    console.log("Received event:", eventText);
    
    var sns = new SNS();
    var bodyObj = JSON.parse(event.Records[0].body);
    var params = {
        Message: bodyObj.Message, 
        Subject: "Test SNS From Lambda",
        PhoneNumber: bodyObj.Subject,
        //PhoneNumber: "+447986670340"
        //TopicArn: "arn:aws:sns:eu-west-2:401739403606:KierensPhone"
    } as SNS.PublishInput;

    sns.publish(params, context.done).promise()
    .then((response) => console.log("success with response: " + JSON.stringify(response) ))
    .catch((err) => console.error("failure with error: " + JSON.stringify(err) ));
};
