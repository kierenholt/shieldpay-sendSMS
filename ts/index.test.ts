import { describe, expect, test } from '@jest/globals';
import { MySMS } from './sendSMS';

//TODO
//SAM needs configuration
test('SMS send test message', async () => {
    MySMS.send("test message", "+447986670340").then(response => {
        expect(response["ResponseMetadata"]).toBeDefined()
    });
});

//example SNS.publishResponse
/*
{
    "ResponseMetadata": {
        "RequestId": "4b9ef848-2846-52ea-8b7e-a3a6b1b44615"
    },
    "MessageId": "6c379cf5-c0fb-5215-9c93-c71b590926ea"
}
*/