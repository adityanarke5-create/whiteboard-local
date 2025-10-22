import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
// @ts-ignore
import jwksClient from 'jwks-rsa';
import { DatabaseService } from '../services/database.service';

console.log('[AuthMiddleware] Initializing authentication middleware');

// Create JWKS client to fetch public keys from Cognito
const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
});

// Initialize database service
const databaseService = new DatabaseService();

console.log('[AuthMiddleware] JWKS client created', {
  region: process.env.AWS_REGION,
  userPoolId: process.env.COGNITO_USER_POOL_ID
});

// Function to get the signing key
async function getSigningKey(kid: string): Promise<string> {
  console.log('[AuthMiddleware] Getting signing key', { kid });
  
  try {
    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    console.log('[AuthMiddleware] Signing key retrieved successfully');
    return publicKey;
  } catch (error) {
    console.error('[AuthMiddleware] Error getting signing key:', error);
    throw error;
  }
}

// Middleware to verify JWT tokens from AWS Cognito
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('[AuthMiddleware] Processing authentication request', {
    method: req.method,
    url: req.url,
    hasAuthHeader: !!req.headers.authorization
  });
  
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.warn('[AuthMiddleware] Authorization header missing or invalid');
      return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    console.log('[AuthMiddleware] Token extracted from header', {
      tokenLength: token.length,
      tokenPreview: token.substring(0, 50) + '...'
    });

    // Check if token looks like a JWT (should have 3 parts separated by dots)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.warn('[AuthMiddleware] Invalid token format - not a JWT', {
        tokenPartsCount: tokenParts.length
      });
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Decode the token to get the kid (key ID)
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (!decodedToken) {
      console.warn('[AuthMiddleware] Invalid token - could not decode');
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log('[AuthMiddleware] Token decoded', {
      kid: decodedToken.header.kid,
      alg: decodedToken.header.alg,
      iss: decodedToken.payload.iss,
      aud: decodedToken.payload.aud
    });

    // Get the signing key
    const signingKey = await getSigningKey(decodedToken.header.kid);

    // Verify the token
    const verifiedToken: any = jwt.verify(token, signingKey, {
      algorithms: ['RS256'],
      issuer: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
      audience: process.env.COGNITO_CLIENT_ID
    });

    console.log('[AuthMiddleware] Token verified successfully', {
      userId: verifiedToken.sub,
      email: verifiedToken.email
    });

    // Ensure user exists in database
    let user = await databaseService.getUserByCognitoId(verifiedToken.sub);
    
    if (!user) {
      console.log('[AuthMiddleware] User not found in database, creating new user record', {
        cognitoId: verifiedToken.sub,
        email: verifiedToken.email,
        name: verifiedToken.name
      });
      
      // Create user in database
      try {
        user = await databaseService.createUser({
          email: verifiedToken.email,
          name: verifiedToken.name,
          cognitoId: verifiedToken.sub
        });
        console.log('[AuthMiddleware] User created successfully', { userId: user.id });
      } catch (error) {
        console.error('[AuthMiddleware] Error creating user in database:', error);
        return res.status(500).json({ error: 'Failed to create user record' });
      }
    } else {
      console.log('[AuthMiddleware] User found in database', { userId: user.id });
    }

    // Add user information to the request
    (req as any).user = {
      id: user.id, // Use database ID instead of Cognito ID
      email: user.email,
      name: user.name
    };

    // Continue to the next middleware or route handler
    console.log('[AuthMiddleware] Authentication successful, proceeding to next handler');
    next();
  } catch (error: any) {
    console.error('[AuthMiddleware] Authentication error:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}