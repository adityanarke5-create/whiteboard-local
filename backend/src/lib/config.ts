import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Environment variable validation
export interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  awsRegion: string;
  cognitoUserPoolId?: string;
  cognitoClientId?: string;
  cognitoDomain?: string;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export function validateConfig(): Config {
  const port = parseInt(process.env.PORT || '3001', 10);
  const nodeEnv = process.env.NODE_ENV || 'development';
  const databaseUrl = process.env.DATABASE_URL;
  const awsRegion = process.env.AWS_REGION;
  
  // Required environment variables
  if (!databaseUrl) {
    throw new ConfigError('DATABASE_URL is required');
  }
  
  if (databaseUrl === 'your-database-connection-string') {
    throw new ConfigError('DATABASE_URL must be configured with a valid connection string');
  }
  
  if (!awsRegion) {
    throw new ConfigError('AWS_REGION is required');
  }
  
  if (awsRegion === 'your-aws-region') {
    throw new ConfigError('AWS_REGION must be configured with a valid AWS region');
  }
  
  // Optional Cognito configuration
  const cognitoUserPoolId = process.env.COGNITO_USER_POOL_ID;
  const cognitoClientId = process.env.COGNITO_CLIENT_ID;
  const cognitoDomain = process.env.COGNITO_DOMAIN;
  
  if (cognitoUserPoolId === 'your-cognito-user-pool-id') {
    throw new ConfigError('COGNITO_USER_POOL_ID must be configured with a valid user pool ID');
  }
  
  if (cognitoClientId === 'your-cognito-client-id') {
    throw new ConfigError('COGNITO_CLIENT_ID must be configured with a valid client ID');
  }
  
  if (cognitoDomain === 'your-cognito-domain') {
    throw new ConfigError('COGNITO_DOMAIN must be configured with a valid domain');
  }
  
  return {
    port,
    nodeEnv,
    databaseUrl,
    awsRegion,
    cognitoUserPoolId,
    cognitoClientId,
    cognitoDomain
  };
}