const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {

    const params = {
        TableName: 'compare-yourself',
        Item: {
            'UserId': {S: event.userId},
            'Age': {N: event.age},
            'Height': {N: event.height},
            'Income': {N: event.income}
        }
    };

    dynamodb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            callback(err);
        } else {
            console.log("Success", data);
            callback(null, data);
        }
    });
};