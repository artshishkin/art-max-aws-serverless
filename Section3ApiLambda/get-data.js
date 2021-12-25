const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const tableName = 'compare-yourself';

exports.handler = (event, context, callback) => {

    const type = event.type;

    let response;

    if (type === 'all') {

        const params = {
            TableName: tableName
        };

        dynamodb.scan(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                callback(err);
            } else {

                const items = data.Items.map(item => {
                        return {
                            age: +item.Age.N,
                            height: +item.Height.N,
                            income: +item.Income.N
                        };
                    }
                );
                callback(null, items);
            }
        });

    } else if (type === 'single') {

        let params = {
            Key: {
                "UserId": {
                    S: "someUserId123"
                }
            },
            TableName: tableName
        };

        dynamodb.getItem(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                callback(err);
            } else {
                const item = {
                    age: +data.Item.Age.N,
                    height: +data.Item.Height.N,
                    income: +data.Item.Income.N
                };
                callback(null, item);
            }
        });

    } else {
        response = {
            statusCode: 400,
            body: 'Wrong type parameter: ' + type + '. Must be `all` or `single`.'
        };
        callback(null, response);
    }
};