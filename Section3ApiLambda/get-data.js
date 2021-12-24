exports.handler = async (event) => {

    const type = event.type;

    let response;

    if (type ==='all') {
        response = {
            statusCode: 200,
            body: JSON.stringify('Return all results'),
        };
    } else if (type === 'single'){
        response = {
            statusCode: 200,
            body: JSON.stringify('Return single result'),
        };
    } else {
        response = {
            statusCode: 400,
            body: JSON.stringify('Wrong type parameter: ' + type + '. Must be `all` or `single`.'),
        };
    }

    return response;
};
