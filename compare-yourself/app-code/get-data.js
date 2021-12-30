const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    const type = event.type;

    let response;
    try {
        if (type === 'all') {

            const params = {
                TableName: tableName
            };

            const data = await dynamodb.scan(params).promise();

            console.log(data);

            const items = data.Items.map(item => {
                    return {
                        age: +item.Age,
                        height: +item.Height,
                        income: +item.Income
                    };
                }
            );
            return items;

        } else if (type === 'single') {

            const userId = event.userId;

            let params = {
                Key: {
                    "UserId": userId
                },
                TableName: tableName
            };

            const data = await dynamodb.get(params).promise();
            console.log(data);
            const item = {
                age: data.Item.Age,
                height: data.Item.Height,
                income: data.Item.Income
            };
            return [item];
        } else {
            response = {
                statusCode: 400,
                body: 'Wrong type parameter: ' + type + '. Must be `all` or `single`.'
            };
            return response;
        }
    } catch (err) {
        console.log("Error", err);
        return err;
    }
};