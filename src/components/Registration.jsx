import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        isVerified: false,
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-1/3 bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
       
        <div className="space-y-2">
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 mb-4 border"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        </div>

        <div className="space-y-2">
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 mb-4 border"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        </div>

        <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div className="space-y-2">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
          type="button"
          className="w-full bg-green-500 text-white p-2"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
