// Authentication Logger Utility
export class AuthLogger {
  private static instance: AuthLogger;
  private logs: any[] = [];
  private maxLogs = 50; // Reduce log storage to improve performance
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): AuthLogger {
    if (!AuthLogger.instance) {
      AuthLogger.instance = new AuthLogger();
    }
    return AuthLogger.instance;
  }

  // Only log in development mode to reduce production overhead
  log(event: string, data?: any) {
    // In production, only log critical events
    if (!this.isDevelopment) {
      // Skip verbose logging in production
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data
    };

    // Add to logs array
    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Also log to console in development
    console.log(`[AuthLogger] ${event}`, data);
  }

  error(event: string, error: any) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      error: {
        message: error.message,
        code: error.code,
        name: error.name,
        stack: error.stack
      }
    };

    // Add to logs array
    this.logs.push(logEntry);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Also log to console
    console.error(`[AuthLogger] ${event}`, logEntry.error);
  }

  getLogs(): any[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Log environment configuration
  logEnvironmentConfig() {
    if (!this.isDevelopment) {
      return; // Skip in production
    }
    
    this.log('Environment Configuration', {
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID ? 
        `${process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID.substring(0, 10)}...` : 
        'Not set',
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ? 
        `${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID.substring(0, 10)}...` : 
        'Not set',
      domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN
    });
  }

  // Log authentication flow events
  logAuthFlow(step: string, details?: any) {
    if (!this.isDevelopment) {
      return; // Skip in production
    }
    
    this.log(`Auth Flow - ${step}`, details);
  }

  // Log token events
  logTokenEvent(event: string, tokenInfo?: any) {
    if (!this.isDevelopment) {
      return; // Skip in production
    }
    
    this.log(`Token Event - ${event}`, tokenInfo);
  }

  // Log user events
  logUserEvent(event: string, userInfo?: any) {
    if (!this.isDevelopment) {
      return; // Skip in production
    }
    
    this.log(`User Event - ${event}`, userInfo);
  }
}

// Export a singleton instance
export const authLogger = AuthLogger.getInstance();