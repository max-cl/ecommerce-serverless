const dbjs = require("./mongodb");
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

exports.lambdaHandler = async (event, context) => {
    try {
        const db = await dbjs.get();
        const data = await db.collection(process.env.MONGODB_COLLECTION).find().toArray();
        response = {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "OPTIONS,POST",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "X-Requested-With": "*",
            },
            body: JSON.stringify(data),
        };
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
    return response;
};
