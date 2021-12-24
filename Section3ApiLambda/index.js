const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {

    const params = {
        TableName: 'compare-yourself',
        Item: {
            'UserId': {S: "blabla7387483"},
            'Age': {N: "38"},
            'Height': {N: "180"},
            'Income': {N: "2500"}
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