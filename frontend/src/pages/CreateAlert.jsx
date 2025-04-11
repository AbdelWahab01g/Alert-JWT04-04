import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Home, UserCog, Users, Menu, Settings, LogOut, X, Plus, AlertTriangle, Trash2 } from 'lucide-react';
import Logo from '../imgs/logo2.png';

const CreateAlert = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    niveau: 'medium',
    action: 'monitor'
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'controleur')) {
      navigate('/login');
    } else {
      fetchAlerts();
    }
  }, [user, navigate]);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/alerts/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
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
      await axios.post('/api/alerts/create/', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchAlerts();
      setFormData({ description: '', niveau: 'medium', action: 'monitor' });
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      await axios.delete(`/api/alerts/${alertId}/delete/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchAlerts(); // Refresh alerts after deletion
      setShowDeleteConfirm(null); // Close confirmation modal
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navigation Bar */}
      <nav className="flex items-center bg-gray-900 text-white p-4 shadow-md h-[100px]">
        <div className="flex items-center absolute left-4">
          <img src={Logo} alt="Logo" className="h-[130px] w-[280px]" />
        </div>
        <div className="flex justify-center items-center space-x-10 w-full">
          <Link to="/home" className="flex items-center space-x-2 hover:text-gray-300">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/controleur" className="flex items-center space-x-2 hover:text-gray-300">
            <UserCog className="h-5 w-5" />
            <span>Controleur</span>
          </Link>
          <Link to="/lecteur" className="flex items-center space-x-2 hover:text-gray-300">
            <Users className="h-5 w-5" />
            <span>Lecteur</span>
          </Link>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center absolute right-4 hover:text-gray-300"
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
          {/* Bottom buttons */}
          <div className="p-4 border-t border-gray-700">
            <button className="flex items-center space-x-3 w-full p-3 hover:bg-gray-700 rounded-lg mb-2">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button 
              onClick={logout}
              className="flex items-center space-x-3 w-full p-3 hover:bg-gray-700 rounded-lg text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Create Alert Form */}
        <div className="bg-[#050829] rounded-lg p-6 shadow-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 text-yellow-500">
            <AlertTriangle size={24} />
            Create New Alert
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Description (max 25 chars)</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={25}
                className="w-full px-3 py-2 border rounded-lg bg-white text-black"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-white text-black"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Action</label>
                <select
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg bg-white text-black"
                >
                  <option value="evacuate">Evacuate</option>
                  <option value="shelter">Shelter</option>
                  <option value="monitor">Monitor</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 px-40 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Create Alert
            </button>
          </form>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-lg p-6 shadow-lg overflow-hidden">
          <h2 className="text-2xl font-bold mb-4 text-center">Recent Alerts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden border-separate border-spacing-0">
              <thead className="bg-[#050829] text-white rounded-t-lg">
                <tr>
                  <th className="px-4 py-2 rounded-tl-lg">Date/Time</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Niveau</th>
                  <th className="px-4 py-2">Action</th>
                  <th className="px-4 py-2 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="hover:bg-gray-300 transition-shadow hover:shadow-md"
                  >
                    <td className="px-4 py-2">{new Date(alert.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">{alert.description}</td>
                    <td className="px-4 py-2 capitalize">{alert.niveau}</td>
                    <td className="px-4 py-2 capitalize">{alert.action}</td>
                    <td className="px-4 py-2 flex justify-center">
                      <button
                        onClick={() => setShowDeleteConfirm(alert.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete Alert"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      {/* Delete Confirmation Modal */}
                      {showDeleteConfirm === alert.id && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded-lg max-w-md">
                            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                            <p className="mb-4">Are you sure you want to delete this alert?</p>
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleDeleteAlert(alert.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                              >
                                Delete
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

export default CreateAlert;