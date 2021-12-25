const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = (event, context, callback) => {

    let params = {
        Key: {
            "UserId": {
                S: "user_0.3609675717962979"
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