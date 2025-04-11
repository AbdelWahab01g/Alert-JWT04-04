import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Home, Users, Menu, X, LayoutDashboard, Settings, LogOut, Upload, Check } from 'lucide-react';
import Logo from '../imgs/logo2.png';
import CardImage1 from '../imgs/shutterstock_150027575-1024x576.jpg';
import CardImage2 from '../imgs/background0.jpeg';
import CardImage3 from '../imgs/background0.jpeg';

const ControleurDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'controleur') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsUploaded(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // API CALL TO UPLOAD FILE TO BACKEND  **mmb3d riglou
      /*
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await axios.post('/api/upload-netcdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      */

      // Simulate upload success
      setTimeout(() => {
        setIsUploaded(true);
      }, 1500);
      
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show error message to user)
    }
  };

  const handleConfirm = async () => {
    try {
      // API CALL TO CONFIRM AND OVERRIDE FILE IN GEOSERVER
      /*
      const response = await axios.post('/api/confirm-netcdf/', {
        filename: selectedFile.name
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      */

      alert("File confirmed and updated in GeoServer successfully!");
      setShowUploadModal(false);
      setSelectedFile(null);
      setIsUploaded(false);
      
    } catch (error) {
      console.error('Confirmation failed:', error);
      // Handle error (show error message to user)
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
          <Link to="/lecteur" className="flex items-center space-x-2 hover:text-gray-300">
            <Users className="h-5 w-5" />
            <span>addlink</span>
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
            <span className="text-sm text-gray-400">Controleur</span>
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

      {/* Enhanced Cards Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link to="/create-alert">
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] 
              shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60">
            <img
              src={CardImage1}
              alt="Alert Service"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Alert</h3>
              <p className="text-gray-600">
                From this service you can add Alerts.
              </p>
            </div>
          </div>
          </Link>

          {/* Card 2 - NetCDF File Upload */}
          <div
            className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] 
            shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60 cursor-pointer"
            onClick={() => setShowUploadModal(true)}
          >
            <img
              src={CardImage2}
              alt="Upload Service"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Upload NetCDF
              </h3>
              <p className="text-gray-600">Upload and update NetCDF files in GeoServer.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] 
              shadow-lg hover:shadow-xl shadow-gray-300/50 hover:shadow-gray-400/60">
            <img
              src={CardImage3}
              alt="Service Three"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Service Three
              </h3>
              <p className="text-gray-600">
                Description of the third service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload File Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-200 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Upload NetCDF File</h3>
              <button 
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setIsUploaded(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">
                    {selectedFile ? (
                      <span className="font-medium">{selectedFile.name}</span>
                    ) : (
                      <>
                        <span className="font-medium">Click to select NetCDF file</span>
                      </>
                    )}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".nc,.netcdf"  // Restrict to NetCDF files
                />
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  setIsUploaded(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>

              {!isUploaded ? (
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md flex items-center ${
                    selectedFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
                  }`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Confirm & Update GeoServer
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControleurDashboard;