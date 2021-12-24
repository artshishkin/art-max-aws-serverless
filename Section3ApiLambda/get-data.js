exports.handler = async (event) => {

    const type = event.type;

    let response;

    if (type ==='all') {
        response = {
            statusCode: 200,
            body: 'Return all results'
        };
    } else if (type === 'single'){
        response = {
            statusCode: 200,
            body: 'Return single result'
        };
    } else {
        response = {
            statusCode: 400,
            body: 'Wrong type parameter: ' + type + '. Must be `all` or `single`.'
        };
    }

    return response;
};