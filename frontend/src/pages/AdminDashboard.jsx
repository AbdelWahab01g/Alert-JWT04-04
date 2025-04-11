import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Home,
  UserCog,
  Users,
  Search,
  Plus,
  ChevronDown,
  Menu,
  Settings,
  LogOut,
  X,
  LayoutDashboard,
  Edit,
  Trash2,
} from 'lucide-react';
import Logo from '../imgs/logo2.png';
import CardImage1 from '../imgs/shutterstock_150027575-1024x576.jpg'; // Replace with actual image path
import CardImage2 from '../imgs/background0.jpeg'; // Replace with actual image path
import CardImage3 from '../imgs/background0.jpeg'; // Replace with actual image path
import axios from 'axios';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // Refresh the list
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navigation Bar */}
      <nav className="flex items-center bg-gray-900 text-white p-4 shadow-md h-[100px]">
        <div className="flex items-center absolute left-4">
          <img src={Logo} alt="Logo" className="h-[130px] w-[280px]" />
        </div>
        <div className="flex justify-center items-center space-x-10 w-full">
          <Link to="/home" className="flex items-center space-x-2 hover:text-gray-300" aria-label="Home">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/controleur" className="flex items-center space-x-2 hover:text-gray-300" aria-label="Controleur">
            <UserCog className="h-5 w-5" />
            <span>addlink</span>
          </Link>
          <Link to="/lecteur" className="flex items-center space-x-2 hover:text-gray-300" aria-label="Lecteur">
            <Users className="h-5 w-5" />
            <span>addlink</span>
          </Link>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center absolute right-4 hover:text-gray-300"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-[#060923] text-white shadow-lg z-50 flex flex-col">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="hover:text-gray-300"
              aria-label="Close Sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* User info */}
          <div className="p-3 flex flex-col items-center border-b border-gray-700">
            <div className="bg-gray-600 rounded-full p-4">
              <UserCog className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">{user?.username}</span>
            <span className="text-sm text-gray-400">Admin</span>
          </div>
          {/* Interface section */}
          <div className="p-4 flex-grow">
            <div className="flex items-center space-x-3 p-3 text-white hover:bg-gray-700 rounded-lg cursor-pointer">
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </div>
            <Link
              to="/register"
              className="flex items-center space-x-3 p-3 text-white hover:bg-gray-700 rounded-lg cursor-pointer"
              aria-label="Add User"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add User</span>
            </Link>
          </div>
          {/* Bottom buttons */}
          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-700 rounded-lg mb-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button
              onClick={logout}
              className="flex items-center space-x-3 w-full p-3 hover:bg-gray-700 rounded-lg text-red-400"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Cards Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link
            to="/create-alert"
            className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60"
            aria-label="User Management"
          >
            <img src={CardImage1} alt="User Management" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Alert</h3>
              <p className="text-gray-600">Hier you can create end descover auther alerts.</p>
            </div>
          </Link>
          {/* Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60">
            <img src={CardImage2} alt="System Settings" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">System Settings</h3>
              <p className="text-gray-600">Configure application settings and preferences.</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60">
            <img src={CardImage3} alt="Reports" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Reports</h3>
              <p className="text-gray-600">View system usage and activity reports.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced User Table Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-[12px] p-6 shadow-lg hover:shadow-xl transition-shadow shadow-gray-300/50 hover:shadow-gray-400/60">
          {/* Title and Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h2>
            <div className="flex w-full md:w-auto space-x-4">
              {/* Search Bar */}
              <div className="relative flex-grow md:flex-grow-0 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                  aria-label="Search Users"
                />
              </div>
              {/* Add User Button */}
              <Link
                to="/register"
                className="flex items-center space-x-2 bg-[#0f1552] hover:bg-[#0a1040] text-white px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40"
                aria-label="Add User"
              >
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </Link>
            </div>
          </div>
          {/* User Table */}
          <div className="overflow-x-auto rounded-[12px]">
            <table className="min-w-full divide-y divide-gray-200 rounded-[12px]">
              <thead className="bg-[#050829]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tl-[12px]">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider rounded-tr-[12px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone_number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <Link
                        to={`/edit-user/${user.id}`}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        aria-label={`Edit ${user.username}`}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => setShowDeleteConfirm(user.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        aria-label={`Delete ${user.username}`}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                      {showDeleteConfirm === user.id && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded-lg max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                            <p className="mb-4">Are you sure you want to delete user {user.username}?</p>
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                aria-label="Cancel Deletion"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                aria-label="Confirm Deletion"
                              >
                                Confirm Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;