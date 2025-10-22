// Authentication Logger Utility
export class AuthLogger {
  private static instance: AuthLogger;
  private logs: any[] = [];
  private maxLogs = 100;

  private constructor() {}

  static getInstance(): AuthLogger {
    if (!AuthLogger.instance) {
      AuthLogger.instance = new AuthLogger();
    }
    return AuthLogger.instance;
  }

  log(event: string, data?: any) {
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

    // Also log to console
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
    this.log(`Auth Flow - ${step}`, details);
  }

  // Log token events
  logTokenEvent(event: string, tokenInfo?: any) {
    this.log(`Token Event - ${event}`, tokenInfo);
  }

  // Log user events
  logUserEvent(event: string, userInfo?: any) {
    this.log(`User Event - ${event}`, userInfo);
  }
}

// Export a singleton instance
export const authLogger = AuthLogger.getInstance();