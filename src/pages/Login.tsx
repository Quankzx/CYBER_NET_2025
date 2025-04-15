import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/forum');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="cyber-heading text-center text-3xl">
            Access Terminal
          </h2>
          <div className="mt-2 text-center text-sm text-gray-400">
            Enter your credentials to connect
          </div>
        </div>
        <form className="mt-8 space-y-6 cyber-card p-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-5 h-5" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="cyber-input pl-10 w-full rounded-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-blue w-5 h-5" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="cyber-input pl-10 w-full rounded-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cyber-button w-full flex justify-center items-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-400">No terminal access? </span>
            <Link to="/register" className="text-neon-blue hover:text-neon-purple transition-colors">
              Initialize connection
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}