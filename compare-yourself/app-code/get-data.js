const {DynamoDBClient, ScanCommand, GetItemCommand} = require("@aws-sdk/client-dynamodb");
const dynamodb = new DynamoDBClient({region: 'eu-north-1'});

const tableName = process.env.COMPARE_YOURSELF_TABLE;

exports.handler = async (event, context) => {

    const type = event.type;

    let response;
    try {
        if (type === 'all') {

            const params = {
                TableName: tableName
            };

            const scanCommand = new ScanCommand(params);
            const data = await dynamodb.send(scanCommand);

            console.log(data);

            const items = data.Items.map(item => {
                    return {
                        age: +item.Age.N,
                        height: +item.Height.N,
                        income: +item.Income.N
                    };
                }
            );
            return items;

        } else if (type === 'single') {

            const userId = event.userId;

            let params = {
                Key: {
                    "UserId": {S: userId}
                },
                TableName: tableName
            };

            const getItemCommand = new GetItemCommand(params);
            const data = await dynamodb.send(getItemCommand);
            console.log(data);
            const item = {
                age: +data.Item.Age.N,
                height: +data.Item.Height.N,
                income: +data.Item.Income.N
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