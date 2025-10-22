'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/lib/auth-service';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState('');
  const router = useRouter();

  console.log('[SignInPage] Rendering sign in page');

  // Check if user is already authenticated
  useEffect(() => {
    console.log('[SignInPage] Checking if user is already authenticated');
    
    // Check if Amplify is properly configured
    if (!process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_DOMAIN || 
        !process.env.NEXT_PUBLIC_AWS_REGION) {
      setConfigError('AWS Cognito is not properly configured. Please check your environment variables.');
      console.warn('[SignInPage] AWS Cognito configuration is incomplete');
    }
    
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      console.log('[SignInPage] Authentication check result:', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('[SignInPage] User is already authenticated, redirecting to dashboard');
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SignInPage] Submitting sign in form', { email });
    
    // Don't proceed if there's a config error
    if (configError) {
      setError('Authentication service is not properly configured.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const result = await AuthService.signIn(email, password);
      console.log('[SignInPage] Sign in attempt result:', result);
      
      if ('error' in result) {
        console.error('[SignInPage] Sign in failed with error:', result.error);
        setError(result.error);
      } else {
        console.log('[SignInPage] Sign in successful, redirecting to dashboard');
        // Redirect to dashboard on success
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('[SignInPage] Unexpected error during sign in:', err);
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  console.log('[SignInPage] Rendering form with state', { 
    email, 
    password, 
    error, 
    loading,
    configError
  });

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {configError && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="text-sm text-red-700">
                <strong>Configuration Error:</strong> {configError}
                <br />
                <br />
                Please ensure your <code className="bg-gray-100 px-1 rounded">.env.local</code> file contains all required AWS Cognito variables:
                <ul className="list-disc pl-5 mt-2">
                  <li>NEXT_PUBLIC_AWS_REGION</li>
                  <li>NEXT_PUBLIC_COGNITO_USER_POOL_ID</li>
                  <li>NEXT_PUBLIC_COGNITO_CLIENT_ID</li>
                  <li>NEXT_PUBLIC_COGNITO_DOMAIN</li>
                </ul>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  {error}
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={!!configError}
                  value={email}
                  onChange={(e) => {
                    console.log('[SignInPage] Email input changed', { value: e.target.value });
                    setEmail(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={!!configError}
                  value={password}
                  onChange={(e) => {
                    console.log('[SignInPage] Password input changed', { value: e.target.value });
                    setPassword(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={!!configError}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !!configError}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}