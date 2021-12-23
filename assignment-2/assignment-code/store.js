let response;

exports.lambdaHandler = async (event, context) => {
    try {

        response = {
            'age': event.age / 2,
            'fullname': event.firstname + ' ' + event.lastname
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};