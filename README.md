# art-max-aws-serverless
AWS Serverless APIs &amp; Apps - A Complete Introduction - Tutorial from Maximilian Schwarzmüller (Udemy)

####  Section 3: Creating an API with API Gateway & AWS Lambda

#####  32. Creating a Lambda Function

1.  Create function
    -  Author from scratch
    -  Function name: `cy-store-data`
    -  Runtime: `Node.js 14.x`
    -  Create function
2.  Modify code
    -  remove async
    -  will be using `promises` instead of `async-await` approach
```javascript
exports.handler = (event, context, callback) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```    
3.  Another modification
```javascript
exports.handler = (event, context, callback) => {
    // TODO implement
    callback(null, {message: 'Hi, I\'m Lambda!'});
};
```    






