'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-500 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full opacity-60"></div>
        <div className="absolute top-32 right-16 w-12 h-12 bg-white/15 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 rounded-full opacity-40"></div>
        <div className="absolute bottom-40 right-12 w-8 h-8 bg-white/25 rounded-full opacity-70"></div>
        
        {/* Main illustration area */}
        <div className="flex items-center justify-center w-full h-full relative z-10">
          <img 
            src="https://64.media.tumblr.com/798b1ae3e9f843b60ab8802813e9cb68/fc239968f5e39f7e-5b/s540x810/3d8643a8cba2b1d680c648fe871b56c14d5d9c27.gif"
            alt="Animated illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-left">
            <div className="flex items-center space-x-3 mb-3">
              <Image 
                src="/logo.svg" 
                alt="Knowledge Tree Logo" 
                width={48} 
                height={48}
                className="w-12 h-12"
              />
              <h1 className="text-4xl font-bold text-gray-900">Knowledge Tree</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-1">Welcome back!</h2>
            <p className="text-gray-600">Continue your learning journey by signing in</p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900 placeholder-gray-500 pr-12"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-gray-600 hover:text-yellow-600">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {message && (
              <div className="text-red-600 text-sm">{message}</div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>

            {/* Sign up link */}
            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Link href="/auth/signup" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Get Started
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
