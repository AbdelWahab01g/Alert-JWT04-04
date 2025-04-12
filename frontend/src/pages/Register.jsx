import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import FireComponent from "../components/Fireanimation";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    role: 'lecteur'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // State for registration success
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for showing success message
  const [tempFormData, setTempFormData] = useState(null); // Temporary storage for form data
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setShowSuccessMessage(false); // Clear any previous success messages
    // Store the form data temporarily instead of sending it immediately
    setTempFormData(formData);
    setIsRegistered(true); // Show confirmation modal
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmation = async (confirmed) => {
    setIsRegistered(false); // Always hide the modal first
    
    if (confirmed && tempFormData) {
      try {
        // Send the temporary form data to the backend
        await axios.post('/api/register/', tempFormData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setShowSuccessMessage(true); // Show success message in the form
        // Reset form after successful registration
        setFormData({
          username: '',
          email: '',
          phone_number: '',
          password: '',
          role: 'lecteur'
        });
      } catch (error) {
        console.error('Registration failed:', error);
        setError(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
    // Clear temporary data
    setTempFormData(null);
  };

  return (
    <div className="min-h-screen bg-[#050829] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Fire Component - positioned absolutely behind content */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <FireComponent />
      </div>
      
      {/* Content container with higher z-index */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register New User
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-sm py-8 px-4 shadow-xl shadow-indigo-500/10 border border-white/20 rounded-lg sm:px-10">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-200 rounded-lg text-sm">
              User registered successfully!
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-200 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/5 text-white hover:bg-white/10 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/5 text-white hover:bg-white/10 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-white">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/5 text-white hover:bg-white/10 transition duration-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300/30 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/5 text-white hover:bg-white/10 transition duration-200 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/5 text-white rounded-lg hover:bg-white/10 transition duration-200"
              >
                <option className="bg-gray-700 text-white" value="admin">Admin</option>
                <option className="bg-gray-700 text-white" value="controleur">Controleur</option>
                <option className="bg-gray-700 text-white" value="lecteur">Lecteur</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 hover:shadow-indigo-500/30"
              >
                Register User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isRegistered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center min-h-[10rem] w-full max-w-md">
            <p className="text-lg font-medium text-gray-800 mb-4">
              Are you sure you want to register this user?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleConfirmation(true)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                Confirm
              </button>
              <button
                onClick={() => handleConfirmation(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;