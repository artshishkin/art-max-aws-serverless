let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log(JSON.stringify(event));
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
