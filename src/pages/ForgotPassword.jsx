import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if email exists (mock validation)
      if (email.includes('@')) {
        setSuccess(true);
      } else {
        setError('Please enter a valid email address');
      }
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Hacktopus Prime</span>
            </Link>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Check Your Email</h1>
            <p className="text-gray-600">We've sent a password reset link to your email address</p>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Reset Link Sent</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your email and click the link to reset your password.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">What to do next:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Check your email inbox</li>
                  <li>• Click the "Reset Password" link</li>
                  <li>• Create a new strong password</li>
                  <li>• Sign in with your new password</li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send Another Email
                </button>
                <Link
                  to="/login"
                  className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Didn't receive the email?{' '}
              <button
                onClick={() => setSuccess(false)}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Hacktopus Prime</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email address"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Demo Reset */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Want to try the demo?</p>
            <button
              onClick={() => {
                setEmail('demo@example.com');
                handleSubmit(new Event('submit'));
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              Use Demo Email
            </button>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-800 mb-3">
            If you're having trouble accessing your account, here are some things to try:
          </p>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check your spam/junk folder</li>
            <li>• Make sure you're using the correct email address</li>
            <li>• Wait a few minutes before requesting another link</li>
            <li>• Contact support if the problem persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
