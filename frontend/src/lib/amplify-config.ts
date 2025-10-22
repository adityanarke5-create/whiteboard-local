import { Amplify } from 'aws-amplify';

// Configure AWS Amplify for Cognito
export const configureAmplify = () => {
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const userPoolClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;

  console.log('[AmplifyConfig] Configuring AWS Amplify with Cognito', {
    region,
    userPoolId: userPoolId ? `${userPoolId.substring(0, 10)}...` : 'Not set',
    userPoolClientId: userPoolClientId ? `${userPoolClientId.substring(0, 10)}...` : 'Not set',
    domain: domain ? `${domain.substring(0, 20)}...` : 'Not set'
  });

  if (userPoolId && userPoolClientId && domain && region) {
    try {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId,
            userPoolClientId,
            signUpVerificationMethod: 'code',
            loginWith: {
              oauth: {
                domain,
                scopes: ['email', 'openid', 'profile'],
                redirectSignIn: ['http://localhost:3000/', 'http://localhost:3000/auth/signin'],
                redirectSignOut: ['http://localhost:3000/', 'http://localhost:3000/auth/signin'],
                responseType: 'code',
              },
            },
          },
        },
      });
      
      console.log('[AmplifyConfig] AWS Amplify configured successfully');
    } catch (error) {
      console.error('[AmplifyConfig] Error configuring AWS Amplify:', error);
    }
  } else {
    console.warn('[AmplifyConfig] AWS Cognito configuration is incomplete. Authentication will not work properly.', {
      userPoolId: !!userPoolId,
      userPoolClientId: !!userPoolClientId,
      domain: !!domain,
      region: !!region
    });
    
    // Provide specific guidance on what's missing
    if (!userPoolId) console.warn('[AmplifyConfig] Missing: NEXT_PUBLIC_COGNITO_USER_POOL_ID');
    if (!userPoolClientId) console.warn('[AmplifyConfig] Missing: NEXT_PUBLIC_COGNITO_CLIENT_ID');
    if (!domain) console.warn('[AmplifyConfig] Missing: NEXT_PUBLIC_COGNITO_DOMAIN');
    if (!region) console.warn('[AmplifyConfig] Missing: NEXT_PUBLIC_AWS_REGION');
    
    console.info('[AmplifyConfig] To fix this, ensure all required environment variables are set in your .env.local file');
  }
};