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

#####  35. Accessing the API from the Web & Fixing CORS Issues

-  go to [codepen.io](https://codepen.io/)
-  Getting Started
-  JS -> Settings -> Behaviour -> Auto-Updating Preview -> Off -> Will appear Run button
```javascript
var xhr = new XMLHttpRequest();
xhr.open('POST','https://9cxvvjl4d0.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself');
xhr.onreadystatechange = function(event) {
  console.log(event.target.response);
}
xhr.send();
```
-  Run
-  Got an error -> Ctrl+Shift+I
    -  `Access to XMLHttpRequest at 'https://9cxvvjl4d0.execute-api.eu-north-1.amazonaws.com/dev/compare-yourself' from origin 'https://cdpn.io' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
-  Add `Access-Control-Allow-Origin` Header to POST Method
    -  Method Response -> 200 -> Add Header -> `Access-Control-Allow-Origin`
    -  Integration Response -> 200 -> Header Mappings -> `Access-Control-Allow-Origin` -> ` '*' `

#####  40. Extracting Request Data with Body Mapping Templates

-  [API Gateway mapping template and access logging variable reference](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html)

```json
{
    "personData":{
        "name":"Art",
        "age":38
    }
}
```

#####  44. Using Models & Validating Requests

```json
{
  "age": 38,
  "height": 180,
  "income": 72
}
```

####  Section 4: Data Storage with DynamoDB

#####  59.1 Creating a Table in DynamoDB - Manually

-  Create Table
-  Table name: `compare-yourself`
-  Partition key:
    -  `UserId`
    -  String
-  Default other
-  Create table


