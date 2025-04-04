// src/pages/EditUser.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Home, UserCog, Users, Menu, Settings, LogOut, X, ChevronDown } from 'lucide-react';
import Logo from '../imgs/logo2.png';
import axios from 'axios';

const EditUser = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    role: 'lecteur'
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [user, navigate, userId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${userId}/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* ... (keep existing nav and sidebar code from AdminDashboard) ... */}

      {/* Edit User Form */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-[12px] p-6 shadow-lg hover:shadow-xl transition-shadow shadow-gray-300/50 hover:shadow-gray-400/60">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="admin">Admin</option>
                  <option value="controleur">Controleur</option>
                  <option value="lecteur">Lecteur</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                to="/admin-dashboard"
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;