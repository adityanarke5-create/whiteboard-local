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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [configError, setConfigError] = useState('');
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    // Check if Amplify is properly configured
    if (!process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || 
        !process.env.NEXT_PUBLIC_COGNITO_DOMAIN || 
        !process.env.NEXT_PUBLIC_AWS_REGION) {
      setConfigError('AWS Cognito is not properly configured. Please check your environment variables.');
    }
    
    const checkAuth = async () => {
      const isAuthenticated = await AuthService.isAuthenticated();
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if there's a config error
    if (configError) {
      setError('Authentication service is not properly configured.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await AuthService.signUp(name, email, password);
      
      if ('error' in result) {
        setError(result.error);
      } else {
        // Show confirmation code input
        setShowConfirmation(true);
        setSuccess('Account created successfully! Please check your email for the confirmation code.');
      }
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't proceed if there's a config error
    if (configError) {
      setError('Authentication service is not properly configured.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await AuthService.confirmSignUp(email, confirmationCode);
      
      if ('error' in result) {
        setError(result.error);
      } else {
        setSuccess('Account confirmed successfully! Redirecting to dashboard...');
        // Redirect to dashboard on success after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError('Failed to confirm account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await AuthService.resendConfirmationCode(email);
      
      if ('error' in result) {
        setError(result.error);
      } else {
        setSuccess('Confirmation code resent successfully! Please check your email.');
      }
    } catch (err) {
      setError('Failed to resend confirmation code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
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
            
            {success && (
              <div className="rounded-md bg-green-50 p-4 mb-4">
                <div className="text-sm text-green-700">
                  {success}
                </div>
              </div>
            )}
            
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="text-sm text-red-700">
                  {error}
                </div>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleConfirmSignUp}>
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
                    onChange={(e) => setConfirmationCode(e.target.value)}
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
              
              <div className="text-sm text-center">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={loading}
                  className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Resending code...' : 'Resend confirmation code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }

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
          
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <div className="text-sm text-green-700">
                {success}
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
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