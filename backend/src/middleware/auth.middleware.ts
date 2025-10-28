import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
// @ts-ignore
import jwksClient from 'jwks-rsa';
import { DatabaseService } from '../services/database.service';
import { validateConfig, Config, ConfigError } from '../lib/config';

// Validate configuration at module load time
let config: Config | null = null;
try {
  config = validateConfig();
} catch (error) {
  if (error instanceof ConfigError) {
    console.error(`[AuthMiddleware] Configuration error: ${error.message}`);
    // We'll handle this error in the middleware function
  } else {
    throw error;
  }
}

// Create JWKS client to fetch public keys from Cognito
let client: any = null;
if (config && config.awsRegion && config.cognitoUserPoolId) {
  client = jwksClient({
    jwksUri: `https://cognito-idp.${config.awsRegion}.amazonaws.com/${config.cognitoUserPoolId}/.well-known/jwks.json`
  });
}

// Initialize database service
const databaseService = new DatabaseService();

// Function to get the signing key
async function getSigningKey(kid: string): Promise<string> {
  try {
    if (!client) {
      throw new Error('JWKS client not initialized due to missing configuration');
    }
    
    const key = await client.getSigningKey(kid);
    const publicKey = key.getPublicKey();
    return publicKey;
  } catch (error) {
    console.error('[AuthMiddleware] Error getting signing key:', error);
    throw error;
  }
}

// Middleware to verify JWT tokens from AWS Cognito
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // Check if configuration is valid
    if (!config) {
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    // Validate required Cognito configuration
    if (!config.cognitoUserPoolId || !config.cognitoClientId || !config.awsRegion) {
      return res.status(500).json({ error: 'Authentication not properly configured' });
    }
    
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or invalid' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Check if token looks like a JWT (should have 3 parts separated by dots)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    // Decode the token to get the kid (key ID)
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Validate token header
    if (!decodedToken.header || !decodedToken.header.kid) {
      return res.status(401).json({ error: 'Invalid token header' });
    }

    // Get the signing key
    const signingKey = await getSigningKey(decodedToken.header.kid);

    // Verify the token
    const verifiedToken: any = jwt.verify(token, signingKey, {
      algorithms: ['RS256'],
      issuer: `https://cognito-idp.${config.awsRegion}.amazonaws.com/${config.cognitoUserPoolId}`,
      audience: config.cognitoClientId
    });

    // Ensure user exists in database
    let user = await databaseService.getUserByCognitoId(verifiedToken.sub);
    
    if (!user) {
      // Create user in database
      try {
        user = await databaseService.createUser({
          email: verifiedToken.email,
          name: verifiedToken.name,
          cognitoId: verifiedToken.sub
        });
      } catch (error) {
        console.error('[AuthMiddleware] Error creating user in database:', error);
        return res.status(500).json({ error: 'Failed to create user record' });
      }
    }

    // Add user information to the request
    (req as any).user = {
      id: user.id, // Use database ID instead of Cognito ID
      email: user.email,
      name: user.name
    };

    // Continue to the next middleware or route handler
    next();
  } catch (error: any) {
    // Handle specific JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    console.error('[AuthMiddleware] Authentication error:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}