const {DynamoDBClient, DeleteItemCommand} = require("@aws-sdk/client-dynamodb");
const dynamodb = new DynamoDBClient({region: 'eu-north-1'});

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    let params = {
        Key: {
            "UserId": {S: event.userId}
        },
        TableName: tableName
    };

    try {
        const deleteItemCommand = new DeleteItemCommand(params);
        const data = await dynamodb.send(deleteItemCommand);
        console.log("Item deleted: ");
        console.log(data);
        return data;
    } catch (err) {
        console.log("Error", err);
        return err;
    }
}
