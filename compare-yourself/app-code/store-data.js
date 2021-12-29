const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'eu-north-1', apiVersion: '2012-08-10'});

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    try {
        const params = {
            TableName: tableName,
            Item: {
                'UserId': {S: event.userId},
                'Age': {N: event.age},
                'Height': {N: event.height},
                'Income': {N: event.income}
            }
        };

        const data = await dynamodb.putItem(params).promise();
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
};