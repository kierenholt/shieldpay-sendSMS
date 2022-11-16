import {describe, expect, test} from '@jest/globals';
import { MySMS } from './sendSMS';

describe('send sms method', () => {
  test('returns ', async () => {
    expect(
        await MySMS.send("test message","+447986670340")
        ).toBe(3);
  });
});

//example successful response
/*
{
    "ResponseMetadata": {
        "RequestId": "4b9ef848-2846-52ea-8b7e-a3a6b1b44615"
    },
    "MessageId": "6c379cf5-c0fb-5215-9c93-c71b590926ea"
}
*/