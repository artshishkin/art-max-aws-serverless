const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-north-1'});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    let params = {
        Key: {
            "UserId": event.userId
        },
        TableName: tableName
    };

    try {
        const data = await dynamodb.delete(params).promise();
        console.log("Item deleted: ");
        console.log(data);
        return data;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}
