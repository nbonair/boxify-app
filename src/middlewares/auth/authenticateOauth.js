import { expressjwt as jwt } from "express-jwt";
import jwksRsa from 'jwks-rsa';

export const authenticateJwt = jwt({
    algorithms: ['RS256', 'RS384', 'RS512'],
    audience: process.env.AZURE_API_CLIENT_ID,
    issuer: `https://login.microsoftonline.com/${process.env.AZURE_API_TENANT_ID}/v2.0`,
    secret: jwksRsa.expressJwtSecret({
        jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_API_TENANT_ID}/discovery/v2.0/keys`,
        cache: true,
        cacheMaxEntries: 10,
        rateLimit: true,
        jwksRequestsPerMinute: 5
    })
});
