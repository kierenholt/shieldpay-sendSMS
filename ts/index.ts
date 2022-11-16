import { MySMS } from './sendSMS';

exports.handler = function(event, context) {
    //var eventText = JSON.stringify(event, null, 2);
    //console.log("Received event:", eventText);
    
    var bodyObj = JSON.parse(event.Records[0].body);
    MySMS.send(bodyObj.Message, bodyObj.Subject);

    //.then((response) => console.log("success with response: " + JSON.stringify(response) ))
    //.catch((err) => console.error("failure with error: " + JSON.stringify(err) ));
};
