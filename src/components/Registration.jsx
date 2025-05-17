import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {

    e.preventDefault();
    console.log( FirstName, LastName,Email, Password);
    const newErrors = {};

    if (!FirstName) newErrors.FirstName = 'First name is required';
    if (!LastName) newErrors.LastName = 'Last name is required';
    if (!Email) newErrors.Email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(Email)) newErrors.Email = 'Please enter a valid email address';
    if (!Password) newErrors.Password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        FirstName,
        LastName,
        Email,
        Password,
        isVerified: false,
      });
      console.log('Registration Successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={handleRegister}>
        <h2 className="text-2xl mb-4 font-semibold text-center">Register</h2>

        <div className="space-y-2 mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
        </div>

        <div className="space-y-2 mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
        </div>

        <div className="space-y-2 mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
        </div>

        <div className="space-y-2 mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600  hover:cursor-pointer"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
