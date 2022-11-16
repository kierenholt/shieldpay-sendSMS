import SNS = require("aws-sdk/clients/sns");
import { subtle } from "crypto";

export class MySMS {
    static send(message, PhoneNumber) {

        var sns = new SNS();
        var params = {
            Message: message, 
            Subject: "Test SNS From Lambda",
            PhoneNumber: PhoneNumber,
            //PhoneNumber: "+447986670340"
            //TopicArn: "arn:aws:sns:eu-west-2:401739403606:KierensPhone"
        } as SNS.PublishInput;
        
        return sns.publish(params, null).promise()
    }
}