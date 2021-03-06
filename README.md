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

#####  96. Adding Signup to the Frontend App

-  use `amazon-cognito-identity-js`
-  [Amazon Cognito Identity SDK for JavaScript](https://www.npmjs.com/package/amazon-cognito-identity-js)

#####  100. Using a Cognito Authorizer with API Gateway

1.  Create Cognito Authorizer
    -  Gateway Console
    -  Authorizers -> Create New Authorizer
    -  Name: `compare-yourself-user-pool`
    -  Type: `Cognito`
    -  Cognito User Pool: `compare-yourself`
    -  Token Source: Authorization
2.  Test it
    -  Test       
    -  Authorization: {{JWT ID token}} (get via Sign In)
    -  **or**   
    -  Authorization: Bearer {{JWT ID token}}
3.  Attach Authorizer to Endpoint
    -  POST, DELETE, GET (**not** OPTIONS)
    -  Method Request
    -  Authorization: `compare-yourself-user-pool`
4.  Deploy    

#####  101. Passing the right User ID to Lambda

Change Request Mapping Template
-  "userId": "$context.authorizer.claims.sub"
```json
#set($userData=$input.path('$'))
{
    "userId": "$context.authorizer.claims.sub",
    "age" : "$userData.age",
    "height" : "$userData.height",
    "income" : "$userData.income"
}
```

####  Section 6: Hosting a Serverless SPA

#####  110. Creating a S3 Bucket

-  Create bucket
    -  Name: `net.shyshkin.compare-yourself`
    -  AWS Region: `eu-north-1`
    -  Other -> Defaults

#####  111. Uploading the Web App to the Bucket

-  `npm run build`
-  Upload -> with default settings

#####  113. Turning a S3 Bucket into a Static Webserver

-  Permissions
    -  Block public access -> Edit
    -  Block all public access -> untick all -> Save changes -> confirm
-  Bucket policy
    -  Learn more -> Bucket policies -> Bucket policy examples
    -  [Granting read-only permission to an anonymous user](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html#example-bucket-policies-use-case-2)
```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"PublicRead",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject","s3:GetObjectVersion"],
      "Resource":["arn:aws:s3:::net.shyshkin.compare-yourself/*"]
    }
  ]
}
```    
-  Static web site
    -  Properties -> Static website hosting -> Edit
    -  Enable
    -  Index document: `index.html`
    -  Error document: `index.html`
    -  Save

#####  114. Setting up Logging

-  Create bucket for logs
    -  Name: `net.shyshkin.compare-yourself.logs`
-  Set up logging for `net.shyshkin.compare-yourself` bucket
    -  `net.shyshkin.compare-yourself` -> Properties
    -  Server access logging -> Edit
        -  Enable
        -  Target bucket: `s3://net.shyshkin.compare-yourself.logs`

#####  117. Setting up a CloudFront Distribution

CloudFront console
-  Create Distribution
    -  Origin
        -  Origin domain: `net.shyshkin.compare-yourself.s3.eu-north-1.amazonaws.com`
        -  Origin path: (no need to specify - we use root level)
        -  S3 bucket access: `Don't use OAI (bucket must allow public access)`
    -  Default cache behavior
        -  Compress objects automatically: Yes
        -  Viewer protocol policy: HTTP and HTTPS
        -  Allowed HTTP methods:  GET, HEAD
        -  Restrict viewer access: No
    -  Settings
        -  Default root object: `index.html`
        -  Standard logging: ~~On~~ Off for now
            -  ~~S3 bucket: net.shyshkin.compare-yourself.logs.s3.amazonaws.com~~
            -  ~~Log Prefix: cdn~~
    -  Create distribution

#####  118. Finishing the CloudFront Setup

Now we can access our web app through:
-  `http://net.shyshkin.compare-yourself.s3-website.eu-north-1.amazonaws.com/` - HTTP
-  `https://d2qloak3q1qgw2.cloudfront.net` - HTTPS CloudFront
-  `http://d2qloak3q1qgw2.cloudfront.net` - HTTP CloudFront

#####  122. Connecting a Domain to a CloudFront Distribution

1. AWS Certificate Manager
    -  Request public certificate
        -  Domain names:        
            -  `compare-yourself.shyshkin.net`
        -  Request
        -  Validate:
            -  Create Record in Route 53
            -  Create records. 
            -  The Certificate status page should open with a status banner reporting Successfully created DNS records.
            -  Your new certificate might continue to display a status of Pending validation for up to 30 minutes.
2. CloudFront
    -  Distributions -> `E9NR9NDP1VAVW` ->
        -  General -> Settings ->
        -  Alternate domain name (CNAME): `compare-yourself.shyshkin.net`
        -  Custom SSL certificate: `compare-yourself.shyshkin.net (86934808-b93b-493e-b4e4-e6f5cab3b00e)`
        -  Save changes
3. Route 53 Console
    -  Hosted Zones -> `shyshkin.net` -> Create a record
        -  Record name: `compare-yourself.shyshkin.net`
        -  Record type: A
        -  Alias
        -  Route traffic to
            -  Alias to CloudFront distribution
            -  `d2qloak3q1qgw2.cloudfront.net`
4. Test
    -  `http://compare-yourself.shyshkin.net` - HTTP Route 53          
    -  `https://compare-yourself.shyshkin.net` - HTTPS Route 53
    -  `https://d2qloak3q1qgw2.cloudfront.net` - HTTPS CloudFront
    -  `http://d2qloak3q1qgw2.cloudfront.net` - HTTP CloudFront
    -  `http://net.shyshkin.compare-yourself.s3-website.eu-north-1.amazonaws.com/` - HTTP S3

#####  Restricting access only to HTTPS

1.  CloudFront -> Distributions -> E9NR9NDP1VAVW
    -  Behaviours -> 0 -> Edit ->
    -  Viewer protocol policy: `Redirect HTTP to HTTPS`
    -  Save changes
2.  Test
    -  `http://compare-yourself.shyshkin.net` -> Redirects to HTTPS Route 53
    -  `https://compare-yourself.shyshkin.net` - HTTPS Route 53
    -  `https://d2qloak3q1qgw2.cloudfront.net` - HTTPS CloudFront
    -  `http://d2qloak3q1qgw2.cloudfront.net` -> Redirects to HTTPS CloudFront
    -  **BUT**   
    -  `http://net.shyshkin.compare-yourself.s3-website.eu-north-1.amazonaws.com/` - HTTP S3

##### 10.1 Fix an error when accessing `https://compare-yourself.shyshkin.net/compare` (#10)

-  CloudFront -> Distributions -> E9NR9NDP1VAVW
-  Error Pages -> Create Custom Error Page
    -  HTTP Error code: 403
    -  Customize error response: Yes
        -  Response page path: `/index.html`
        -  HTTP Response code: 200

#####  Restricting Access to S3 Bucket

-  [How do I use my CloudFront distribution to restrict access to an Amazon S3 bucket?](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-access-to-amazon-s3/)
-  CloudFront -> Origins -> net.shyshkin.compare-yourself... -> Edit
    -  S3 bucket access    
    -  Yes use OAI (bucket can restrict access to only CloudFront)
    -  Origin access identity -> Create new OAI
    -  Bucket policy -> Yes, update the bucket policy
-  Modify Bucket Policy
    -  S3 -> `net.shyshkin.compare-yourself` -> Permissions -> Bucket policy -> Edit
    -  Delete Statement with "Sid": "PublicRead"
    -  Leave only    
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "2",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity E116E1N2RAPRW5"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::net.shyshkin.compare-yourself/*"
        }
    ]
}
```
-  Test
    -  `http://net.shyshkin.compare-yourself.s3-website.eu-north-1.amazonaws.com/` -> 403 Forbidden
    -  `https://compare-yourself.shyshkin.net` - HTTPS Route 53
    -  `https://d2qloak3q1qgw2.cloudfront.net` - HTTPS CloudFront

####  #4 Migrate JavaScript SDK to version 3

Examples:
-  [Calling DynamoDB from Lambda in Node.js](https://docs.amplify.aws/guides/functions/dynamodb-from-js-lambda/q/platform/js/#getting-an-item-by-primary-key-in-dynamodb-from-lambda)
-  [DynamoDB CRUD with NodeJS and Lambda](https://dev.to/rajandmr/dynamodb-crud-with-nodejs-and-lambda-inn)

####  #5 Provide Lambda-free solution for API-DynamoDB interaction

#####  5.3 Replace store-data lambda function with direct DynamoDB PutItem call 

```json
#set($userData=$input.path('$'))
{
  "TableName": "compare-yourself-lambdaless-CompareYourselfTable-1ODYP8HFZOF7J",
  "Item": {
    "UserId": {"S": "$context.authorizer.claims.sub"},
    "Age": {"N": "$userData.age"},
    "Height": {"N": "$userData.height"},
    "Income": {"N": "$userData.income"}
  }
}
```
Test with
```json
{
"age": 3,
"height":3,
"income":2000
}
```

#####  5.5 Replace delete-data lambda function with direct DynamoDB DeleteItem call

```json
{
  "TableName": "compare-yourself-lambdaless-CompareYourselfTable-1ODYP8HFZOF7J",
  "Key": {
    "UserId": {"S": "$context.authorizer.claims.sub"}
  }
}
```

#####  5.6 Splitting GET Endpoint into Single and All - Get Single Data

Integration Request
```json
{
  "TableName": "compare-yourself-lambdaless-CompareYourselfTable-1ODYP8HFZOF7J",
  "Key": {
    "UserId": {"S": "$context.authorizer.claims.sub"}
  }
}
```

Integration Response
```json
#set($inputRoot = $input.path('$'))
[
  {
    "income" : $inputRoot.Item.Income.N,
    "age" : $inputRoot.Item.Age.N,
    "height" : $inputRoot.Item.Height.N
  }
]
```

#####  5.7 Splitting GET Endpoint into Single and All - Get All Data

Integration Request
```json
{
  "TableName": "compare-yourself-lambdaless-CompareYourselfTable-1ODYP8HFZOF7J"
}
```

Integration Response
```json
#set($inputRoot = $input.path('$'))
[
#foreach($item in $inputRoot.Items)
 {
  "income" : $item.Income.N,
  "age" : $item.Age.N,
  "height" : $item.Height.N
} 
#if($foreach.hasNext),#end
#end
]
```

####  Section 7: Beyond the Basics - An Outlook

#####  125. Documenting an API

API Gateway console
1. Way ONE
    -  Documentation
    -  Create Documentation Part
        -  Type: `Method`
        -  Path: `/compare-yourself/all`
        -  Method: `GET`
        -  `"description": "Allows us to get all users' data"`
2.  Way TWO
    -  Resources -> `/compare-yourself/single` -> GET
    -  Actions -> Edit Method Documentation
        -  `"description": "Allows us to get single user's data"`        
3.  Deploy API
    -  Export OpenAPI 3 -> **NO** Documentation Added
4.  Publish documentation
    -  Documentation
    -  Publish Documentation
        -  Stage: Prod
        -  Version: 1.0-art
        -  Description: Compare Yourself API version 1.0
    -  Export -> OpenAPI 3 + API Gateway Extensions

#####  126.2 Other AWS Lambda Triggers - S3 Events - through SAM

-  `sam init` -> 1 -> 1 -> 1
    -  project name: `s3-trigger-sam`
    -  5 - Quick Start: S3
-  `cd s3-trigger-sam`
-  `sam build`   
-  `sam deploy --guided`
    -  Parameter AppBucketName []: art-cool-bucket

#####  128. Running Node/ Express Apps via Lambda + API Gateway

1.  Run locally
    -  `cd express-serverless`
    -  `npm start`
    -  visit `localhost:3000`
    -  visit `localhost:3000/users`
    -  visit `localhost:3000/usersERROR` -> 404 page
2.  Install additional package
    -  `npm install --save aws-serverless-express`
3.  Create `lambda.js`
    -  code from [AWS Serverless Express](https://www.npmjs.com/package/aws-serverless-express)
4.  Bundle it
    -  zip files (without folder)
5.  Create Lambda
    -  Lambda Console -> create function
    -  Name: `serverless-express`
    -  Upload from zip file
    -  Handler: lambda.handler
    -  Timeout: increase to 10 seconds
6.  Create API Gateway
    -  name: `serverless-express`
    -  Actions:
        -  Create Method: ANY
        -  Integration type: Lambda Function
        -  Use Lambda Proxy integration
        -  Lambda Function: `serverless-express`
    -  Create Resource:
        -  Configure as proxy resource
        -  Lambda Function: `serverless-express`
7.  Deploy API
    -  New Stage: `dev`
8.  Visit
    -  `https://zj05j4z4ad.execute-api.eu-north-1.amazonaws.com/dev`
    -  `https://zj05j4z4ad.execute-api.eu-north-1.amazonaws.com/dev/users`
9.  Styles missing -> need different location (not like server)     

#####  137. Testing Serverless Apps with localstack

[LocalStack](https://github.com/localstack/localstack)




