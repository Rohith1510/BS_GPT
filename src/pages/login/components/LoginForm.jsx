import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import AlertBanner from '../../../components/ui/AlertBanner';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const LoginForm = () => {
  const { signIn, signUp, signInWithGoogle, loading, authError, clearError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'analyst'
  });
  const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (authError) clearError();
  };

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupMessage, setSignupMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setSignupSuccess(false);
    setSignupMessage('');

    try {
      if (isSignUp) {
        const result = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          role: formData.role
        });
        
        if (result?.success) {
          if (result.needsEmailConfirmation) {
            setSignupSuccess(true);
            setSignupMessage(result.message || 'Please check your email to confirm your account before logging in.');
            // Reset form
            setFormData({
              email: '',
              password: '',
              fullName: '',
              role: 'analyst'
            });
            setIsSignUp(false); // Switch to login view
          } else {
            console.log('Signup successful');
          }
        }
      } else {
        const result = await signIn(formData.email, formData.password);
        
        if (result?.success) {
          // Redirect will happen via AuthContext
          console.log('Login successful');
        }
      }
    } finally {
      setFormLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      role: 'analyst'
    });
    if (authError) clearError();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="backdrop-blur-md bg-black/20 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-300">
            {isSignUp 
              ? 'Join BalanceSheet-GPT to analyze financial data' :'Sign in to your BalanceSheet-GPT account'
            }
          </p>
        </div>

        {authError && (
          <div className="mb-6">
            <AlertBanner
              message={authError}
              type="error"
              onClose={clearError}
              allowCopy={true}
            />
          </div>
        )}

        {signupSuccess && (
          <div className="mb-6">
            <AlertBanner
              message={signupMessage}
              type="success"
              onClose={() => setSignupSuccess(false)}
              allowCopy={false}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                >
                  <option value="analyst" className="bg-gray-900">Financial Analyst</option>
                  <option value="ceo" className="bg-gray-900">CEO</option>
                  <option value="group_admin" className="bg-gray-900">Group Admin</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-400 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={formLoading || loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {formLoading || loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </div>
            )}
          </Button>
        </form>

        {/* Google Sign-In Button */}
        {/* <div className="mt-4">
          <Button
            type="button"
            onClick={async () => {
              setFormLoading(true);
              await signInWithGoogle();
              setFormLoading(false);
            }}
            className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-200"
            disabled={formLoading || loading}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.2 5.1 29.3 3 24 3c-7.2 0-13 5.8-13 13 0 1.6.3 3.1.8 4.7z" fill="#FF3D00"/><path d="M24 45c5.6 0 10.5-1.9 14.3-5.1l-6.6-5.4C29.7 36.5 26.9 37.5 24 37.5c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.9 41.6 15.4 45 24 45z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2.1l-7 5.4C15.4 41.6 19.4 45 24 45c10.5 0 20-7.7 20-21 0-1.3-.1-2.7-.3-4z" fill="#1976D2"/></g></svg>
            Sign in with Google
          </Button>
        </div> */}

        <div className="mt-6 text-center">
          <p className="text-gray-300 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={toggleMode}
              className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Demo Credentials */}
        {/* <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg">
          <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-300">
            <p>• Group Admin: admin@ambani.com / admin123</p>
            <p>• CEO: ceo@reliancejio.com / ceo123</p>
            <p>• Analyst: analyst@reliance.com / analyst123</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;