const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    try {
        const params = {
            TableName: tableName,
            Item: {
                'UserId': event.userId,
                'Age': event.age,
                'Height': event.height,
                'Income': event.income
            }
        };

        const data = await dynamodb.put(params).promise();
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
};