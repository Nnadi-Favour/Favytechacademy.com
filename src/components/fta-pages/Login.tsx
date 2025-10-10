import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!userId.trim() || !password.trim()) {
      setError('Please enter both User ID and Password');
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(userId.trim(), password);
      
      if (result.success) {
        toast.success('Login successful!', {
          description: 'Redirecting to your dashboard...',
        });
        
        // Redirect based on user role
        if (userId.startsWith('ADMIN')) {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } else {
        setError(result.message || 'Invalid credentials. Please check your User ID and Password.');
        toast.error('Login failed', {
          description: result.message || 'Invalid credentials provided',
        });
      }
    } catch (error) {
      setError('Network error. Please try again.');
      toast.error('Login failed', {
        description: 'Network error. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="mb-2">Welcome Back!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access your learning dashboard
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Student / Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="userId">
                  <User className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  Student ID / Admin ID
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="username"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Your unique identifier provided during registration
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 inline mr-1" aria-hidden="true" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="current-password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    Login
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Registration Notice */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h3 className="text-base">Don't Have an Account?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contact our support team to register and receive your login credentials after payment confirmation.
              </p>
              <Button
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Need help? Visit our{' '}
            <button
              onClick={() => navigate('/faq')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              FAQ page
            </button>
            {' '}or{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contact us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}