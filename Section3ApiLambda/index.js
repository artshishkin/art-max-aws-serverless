const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    let {name, age} = event;
    let message = name + ' ' + age;
    let result = {'message': message};
    callback(null, result);
};