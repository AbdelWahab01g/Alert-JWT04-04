// src/pages/Login.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import bgImage from '../imgs/background0.jpeg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }
  };

  return (
    <>
      {/* Import Google Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap" rel="stylesheet" />

      <div 
        className="flex items-center justify-center w-full h-screen p-4"
        style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <motion.div 
          className="w-full max-w-md relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: '60vh', minHeight: '500px', maxHeight: '700px' }}
        >
          {/* Background Blur Box */}
          <div className="w-full h-full absolute bg-opacity-8 rounded-[31px] shadow-[4px_9px_50px_0px_rgba(0,0,0,0.25)] border-2 border-white backdrop-blur-[16px]" />

          {/* Title */}
          <div className="absolute left-0 right-0 top-[10%] text-red-500 text-4xl md:text-5xl font-semibold text-center font-rubik">
            Sign In
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="h-full">
            {/* Username Input */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[30%] w-[90%] h-14 bg-white rounded-[10px]">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-full bg-transparent px-4 text-slate-800 text-lg md:text-xl font-normal outline-none font-rubik"
                autoComplete="username"
              />
            </div>

            {/* Password Input */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[45%] w-[90%] h-14 bg-white rounded-[10px] flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent px-4 text-slate-800 text-lg md:text-xl font-normal outline-none font-rubik"
                autoComplete="current-password"
              />
              {/* Eye Icon */}
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="absolute left-1/2 transform -translate-x-1/2 top-[59%] text-white text-base md:text-lg w-[90%] text-center font-rubik">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="absolute left-1/2 transform -translate-x-1/2 top-[65%] w-[90%] h-14 bg-red-600 rounded-[10px] text-white text-xl md:text-2xl font-medium hover:bg-red-700 transition font-rubik"
            >
              Sign In
            </button>
          </form>

          {/* Forget Password Link */}
          <a 
            href="#" 
            className="absolute left-0 right-0 bottom-[10%] text-rose-500 text-lg md:text-xl font-medium cursor-pointer hover:underline text-center font-rubik"
            onClick={(e) => {
              e.preventDefault();
              // Add your forgot password logic here
            }}
          >
            Forgot Password?
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default Login;