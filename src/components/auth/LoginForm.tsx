import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../contexts/AuthContext';
import { AuthService } from '../../lib/auth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onClose?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!AuthService.isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose?.();
      } else {
        setError(result.error || 'Login failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-center" style={{ color: 'var(--primary-green)' }}>
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your Natural Plantation account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-input-background"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="bg-input-background pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            style={{ backgroundColor: 'var(--primary-green)' }}
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-medium hover:underline"
                style={{ color: 'var(--primary-green)' }}
              >
                Create Account
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};