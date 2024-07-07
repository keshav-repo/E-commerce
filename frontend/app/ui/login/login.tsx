'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

const LoginModule: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        setMessage('');
        router.push('/home');
      } else {
        const data = await response.json();
        setMessage(data.message || 'Something went wrong');
      }
    } catch (err) {
      setMessage('Login failed, please check your credentials');
    }
  };

  const handleSignupRedirect = async () => {
    router.push('/signup'); // Change '/signup' to the correct path of your signup page
  };

  const handleGoogleLogin = async (e: any) => {
    const currentUrl = window.location.href;
    window.location.href = `http://localhost:8080/api/auth/google?returnTo=${encodeURIComponent(
      currentUrl,
    )}`;

    // window.location.href = 'http://localhost:8080/api/auth/google';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pink-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700">
          Login
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="text"
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-red-500 focus:outline-none"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label
              htmlFor="username"
              className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-red-500 focus:outline-none"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              htmlFor="password"
              className="absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
            >
              Password
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-6 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600"
            >
              CONTINUE
            </button>
          </div>
          {message && (
            <p className="mt-4 rounded border border-red-400 bg-red-100 p-3 text-center text-sm font-semibold text-red-700">
              {message}
            </p>
          )}
          <p className="mt-4 text-center text-gray-600">
            By continuing, I agree to the{' '}
            <a href="#" className="text-red-500">
              Terms of Use
            </a>{' '}
            &{' '}
            <a href="#" className="text-red-500">
              Privacy Policy
            </a>
          </p>
        </form>
        <div className="flex justify-center">
          <button
            onClick={handleSignupRedirect}
            className="mx-auto mt-4 w-1/2 rounded bg-blue-400 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Signup
          </button>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleGoogleLogin}
            className="mx-auto flex w-1/2 max-w-xs items-center justify-center rounded border border-gray-400 bg-transparent p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            aria-label="Login with Google"
          >
            <FcGoogle className="mr-2" />
            <span className="font-semibold">Google Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModule;
