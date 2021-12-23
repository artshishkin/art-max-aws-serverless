exports.handler = (event, context, callback) => {
    let {name, age} = event;
    let message = name + ' ' + age;
    let result = {'message': message};
    callback(null, result);
};