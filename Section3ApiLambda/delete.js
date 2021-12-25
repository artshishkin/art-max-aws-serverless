const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const tableName = 'compare-yourself';

exports.handler = (event, context, callback) => {

    let params = {
        Key: {
            "UserId": {
                S: "someUserId123"
            }
        },
        TableName: tableName
    };

    dynamodb.deleteItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            callback(err);
        } else {
            console.log("Item deleted: ");
            console.log(data);
            callback(null, data);
        }
    });

};