'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService } from '@/lib/auth-service';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [configError, setConfigError] = useState('');
  const router = useRouter();

  console.log('[SignUpPage] Rendering sign up page', { showConfirmation });

  // Check if user is already authenticated
  useEffect(() => {
    console.log('[SignUpPage] Checking if user is already authenticated');
    
    // Check if Amplify is properly configured
    if (!process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_DOMAIN || 
        !process.env.NEXT_PUBLIC_AWS_REGION) {
      setConfigError('AWS Cognito is not properly configured. Please check your environment variables.');
      console.warn('[SignUpPage] AWS Cognito configuration is incomplete');
    }
    
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      console.log('[SignUpPage] Authentication check result:', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('[SignUpPage] User is already authenticated, redirecting to dashboard');
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SignUpPage] Submitting sign up form', { name, email });
    
    // Don't proceed if there's a config error
    if (configError) {
      setError('Authentication service is not properly configured.');
      return;
    }
    
    setLoading(true);
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      console.warn('[SignUpPage] Passwords do not match');
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await AuthService.signUp(name, email, password);
      console.log('[SignUpPage] Sign up attempt result:', result);
      
      if ('error' in result) {
        console.error('[SignUpPage] Sign up failed with error:', result.error);
        setError(result.error);
      } else {
        console.log('[SignUpPage] Sign up successful, showing confirmation form');
        // Show confirmation code input
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error('[SignUpPage] Unexpected error during sign up:', err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[SignUpPage] Submitting confirmation code', { email, confirmationCode });
    
    // Don't proceed if there's a config error
    if (configError) {
      setError('Authentication service is not properly configured.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const result = await AuthService.confirmSignUp(email, confirmationCode);
      console.log('[SignUpPage] Confirmation attempt result:', result);
      
      if ('error' in result) {
        console.error('[SignUpPage] Confirmation failed with error:', result.error);
        setError(result.error);
      } else {
        console.log('[SignUpPage] Confirmation successful, redirecting to dashboard');
        // Redirect to dashboard on success
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('[SignUpPage] Unexpected error during confirmation:', err);
      setError('Failed to confirm account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    console.log('[SignUpPage] Rendering confirmation form');
    
    return (
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Confirm your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please check your email for the confirmation code
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {configError && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="text-sm text-red-700">
                  <strong>Configuration Error:</strong> {configError}
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleConfirmSignUp}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">
                    {error}
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="confirmation-code" className="block text-sm font-medium text-gray-700">
                  Confirmation Code
                </label>
                <div className="mt-1">
                  <input
                    id="confirmation-code"
                    name="confirmation-code"
                    type="text"
                    required
                    disabled={!!configError}
                    value={confirmationCode}
                    onChange={(e) => {
                      console.log('[SignUpPage] Confirmation code input changed', { value: e.target.value });
                      setConfirmationCode(e.target.value);
                    }}
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !!configError}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Confirming...' : 'Confirm Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

  console.log('[SignUpPage] Rendering sign up form with state', { 
    name, 
    email, 
    password, 
    confirmPassword, 
    error, 
    loading,
    configError
  });

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            sign in to your existing account
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
          
          <form className="space-y-6" onSubmit={handleSignUp}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  {error}
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={!!configError}
                  value={name}
                  onChange={(e) => {
                    console.log('[SignUpPage] Name input changed', { value: e.target.value });
                    setName(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

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
                    console.log('[SignUpPage] Email input changed', { value: e.target.value });
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
                  required
                  disabled={!!configError}
                  value={password}
                  onChange={(e) => {
                    console.log('[SignUpPage] Password input changed', { value: e.target.value });
                    setPassword(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  disabled={!!configError}
                  value={confirmPassword}
                  onChange={(e) => {
                    console.log('[SignUpPage] Confirm password input changed', { value: e.target.value });
                    setConfirmPassword(e.target.value);
                  }}
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${configError ? 'bg-gray-100' : ''}`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !!configError}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}