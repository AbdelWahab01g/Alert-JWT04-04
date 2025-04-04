import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Users, Menu, X, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import Logo from '../imgs/logo2.png';
import CardImage1 from '../imgs/shutterstock_150027575-1024x576.jpg'; // change imgs later bdatlom atfaker
import CardImage2 from '../imgs/background0.jpeg'; // change imgs later bdatlom atfaker
import { useState } from 'react';

const LecteurDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'lecteur') {
      navigate('/login');
    }
  }, [user, navigate]);

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
              <Users className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg">{user?.username}</span>
            <span className="text-sm text-gray-400">Lecteur</span>
          </div>
          
          {/* Interface section */}
          <div className="p-4 flex-grow">
            <div className="flex items-center space-x-3 p-3 text-white hover:bg-gray-700 rounded-lg cursor-pointer">
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Interface Mapping</span>
            </div>
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

      {/* Enhanced Cards Section with Improved Shadows */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <Link to="/lecteur-alert">
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] 
              shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60 w-[90%] mx-auto">
            <img 
              src={CardImage1} 
              alt="Service 1" 
              className="w-full h-55 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Alert</h3>
              <p className="text-gray-600">
                From this service you can add Alerts.
              </p>
            </div>
          </div>
          </Link>

          {/* Card 2 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] 
              shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60 w-[90%] mx-auto">
            <img 
              src={CardImage2} 
              alt="Service 2" 
              className="w-full h-55 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Archive</h3>
              <p className="text-gray-600">
                Hier you can find old Maps / Layears.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecteurDashboard;