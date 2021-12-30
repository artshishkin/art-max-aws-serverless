const {DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const dynamodb = new DynamoDBClient({region: 'eu-north-1'});

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

        const putItemCommand = new PutItemCommand(params);
        const data = await dynamodb.send(putItemCommand);
        console.log("Success", data);
        return data;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
};