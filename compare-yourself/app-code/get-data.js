const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = (event, context, callback) => {

    const type = event.type;

    let response;

    const params = {
        TableName: tableName
    };

    if (type === 'all') {

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
        response = {
            statusCode: 200,
            body: 'Return single result'
        };
        callback(null, response);
    } else {
        response = {
            statusCode: 400,
            body: 'Wrong type parameter: ' + type + '. Must be `all` or `single`.'
        };
        callback(null, response);
    }
};