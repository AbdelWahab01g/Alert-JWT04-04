import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Home, UserCog, Users, Menu, Settings, LogOut, X, Plus } from 'lucide-react';
import Logo from '../imgs/logo2.png';

const CreateAlert = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    niveau: 'medium',
    action: 'monitor'
  });

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

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navigation and Sidebar (same as AdminDashboard) */}

      <div className="container mx-auto px-4 py-8">
        {/* Create Alert Form */}
        <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Create New Alert</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Description (max 25 chars)</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={25}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Action</label>
                <select
                  name="action"
                  value={formData.action}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="evacuate">Evacuate</option>
                  <option value="shelter">Shelter</option>
                  <option value="monitor">Monitor</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Alert
            </button>
          </form>
        </div>

        {/* Alerts Table */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-4 py-2">Date/Time</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Niveau</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{new Date(alert.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2 border">{alert.description}</td>
                    <td className="px-4 py-2 border capitalize">{alert.niveau}</td>
                    <td className="px-4 py-2 border capitalize">{alert.action}</td>
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