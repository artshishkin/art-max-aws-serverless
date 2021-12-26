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

#####  62. Creating and Scanning Items

1.  Create Item
    -  UserId: `someUserId123`
    -  Add new Attribute
    -  Number -> Age: 38
    -  Number -> Height: 180
    -  Number -> Income: 2500
    -  Create
2.  Scan
    -  can scan through all data and filter result by attribute (field) values
3.  Query
    -  by partition key
    
#####  67. Setting Permissions Right

-  modify lambda role `cy-store-data-role-h7nn30v6`
-  attach policy `AmazonDynamoDBFullAccess` (for simplicity)
-  test -> Success
-  visit DynamoDB -> item added 

#####  71.1 Improving the IAM Permissions

1.  Create Policy for storing data
    -  IAM ->  Policies -> Create Policy
    -  Service: DynamoDB
    -  Action: PutItem
    -  Resource: `arn:aws:dynamodb:eu-north-1:392971033516:table/compare-yourself`
    -  Name: `cy-dynamodb-putitem`
    -  Create
2.  Detach FullAccess Policy from `cy-store-data-role-h7nn30v6`
3.  Attach `cy-dynamodb-putitem` policy to `cy-store-data-role-h7nn30v6`
4.  Create Policy for Fetching Data
    -  Actions: 
        -  Scan
        -  GetItem
    -  Resource:
       -  `arn:aws:dynamodb:eu-north-1:392971033516:table/compare-yourself/index/*`
       -  `arn:aws:dynamodb:eu-north-1:392971033516:table/compare-yourself`
    -  Name: `cy-dynamodb-fetch`
5.  Detach `AmazonDynamoDBReadOnlyAccess` from `cy-get-data-...` role
6.  Attach `cy-dynamodb-fetch`

####  Section 5: Authenticating Users with Cognito and API Gateway Authorizers

#####  83. Creating a Custom Authorizer Function

-  Create Lambda Function: `cy-custom-auth`
-  [Input to an Amazon API Gateway Lambda authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-input.html)

#####  91. Creating a Cognito User Pool

-  Create new User Pool
-  Name: `compare-yourself`
-  Step through settings
-  Attributes   
    -  Username
    -  Also allow sign in with verified email address
    -  Which standard attributes do you want to require
        -  email
    -  Next
-  Security
    -  Password strength
        -  Min length: 6
        -  Untick all (for study purpose)
    -  Allow users to sign themselves up
-  MFA and verifications
    -  Which attributes do you want to verify? -> email
-  Message customizations -> leave defaults
-  Devices
    -  Remember -> No
-  App clients -> Add
    -  Name: `compare-yourself-angular`
    -  Access token expiration: 5min (for testing)
    -  Generate client secret: **NO**
    -  Auth Flows Configuration:
        -  ALLOW_ADMIN_USER_PASSWORD_AUTH: false
        -  ALLOW_CUSTOM_AUTH: true
        -  ALLOW_USER_PASSWORD_AUTH: true
        -  ALLOW_USER_SRP_AUTH: true
        -  ALLOW_REFRESH_TOKEN_AUTH: true
    -  Create app client
-  Triggers -> leave empty
-  Create pool

#####  94. Adding Cognito to a Frontend App - Getting Started

-  `npm install`
-  `npm start`
-  visit `http://localhost:4200/`




