import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import Logo from '../imgs/logo2.png';

const LecteurAlert = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'lecteur') {
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

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navigation and Sidebar (similar to other dashboards) */}

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          {/* Title with AlertTriangle Icon */}
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-600">
            <AlertTriangle size={24} />
            Alerts
          </h2>

          {/* Alerts Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden border-separate border-spacing-0">
              <thead className="bg-[#050829] text-white rounded-t-lg">
                <tr>
                  <th className="px-4 py-2 rounded-tl-lg">Date/Time</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Niveau</th>
                  <th className="px-4 py-2 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-transparent">
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className={`hover:bg-gray-50 transition-shadow hover:shadow-md ${
                      alert.niveau === 'high'
                        ? 'bg-red-50'
                        : alert.niveau === 'medium'
                        ? 'bg-yellow-50'
                        : 'bg-green-50'
                    }`}
                  >
                    <td className="px-4 py-2">{new Date(alert.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2">{alert.description}</td>
                    <td className="px-4 py-2 capitalize">{alert.niveau}</td>
                    <td className="px-4 py-2 capitalize">{alert.action}</td>
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

export default LecteurAlert;