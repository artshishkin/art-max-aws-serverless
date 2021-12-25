exports.handler = async (event) => {
    const token = event.authorizationToken;
    //use token

    if (token === 'allow') {
        const policy = genPolicy('Allow', event.methodArn);
        const principalId = 'askdjak123123jkjk';
        const context = {
            simpleAuth: true,
            purpose: 'Context is optional'
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        return response;
    } else if (token === 'deny') {
        const policy = genPolicy('deny', event.methodArn);
        const principalId = 'askdjak123123jkjk';
        const context = {
            simpleAuth: true,
            purpose: 'Context is optional'
        };
        const response = {
            principalId: principalId,
            policyDocument: policy,
            context: context
        };
        return response;

    } else {
        throw new Error('Unauthorized');
    }
};

function genPolicy(effect, resource) {

    let policy = {};
    policy.Version = '2012-10-17';

    policy.Statement = [];

    let stmt = {};
    stmt.Effect = effect;
    stmt.Action = 'execute-api:Invoke';
    stmt.Resource = resource;

    policy.Statement.push(stmt);

    return policy;
}