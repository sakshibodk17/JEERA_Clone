import React, { useState } from 'react';
import axios from 'axios';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPass = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email) {
      setError('Email is required');
      return;
    }

    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setError('Please enter a valid email');
      return;
    }

    try {
      const res = await axios.post('/api/forgotpassword', { email });
      setMessage('Reset link sent! Please check your email.');
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleForgotPass}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">Forgot Password</h2>

        <div className="space-y-2 mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Enter your registered email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
