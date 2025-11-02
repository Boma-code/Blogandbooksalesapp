import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner@2.0.3';

type LoginPageProps = {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onSwitchToSignup?: () => void;
};

export function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await onLogin(email, password);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border-2 border-yellow-500">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-3xl text-black mb-2">
              Admin Login
            </h2>
            <p className="text-gray-600">
              Sign in to manage your essays and content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@colinstandley.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600 py-6 text-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {onSwitchToSignup && (
            <div className="mt-6 text-center">
              <button
                onClick={onSwitchToSignup}
                className="text-yellow-600 hover:text-yellow-700 transition-colors"
              >
                Don't have an account? <strong>Sign Up</strong>
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
