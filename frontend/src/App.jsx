import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import "./App.css";
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ControleurDashboard from './pages/ControleurDashboard';
import LecteurDashboard from './pages/LecteurDashboard'; 
// import MappingInterface from './pages/MappingInterface'; // Import the new component
import PrivateRoute from './components/PrivateRoute';
import EditUser from "./pages/EditUser";
import CreateAlert from "./pages/CreateAlert";
import LecteurAlert from "./pages/LecteurAlert";
import InterfacePage from "./pages/InterfacePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={
            <PrivateRoute allowedRoles={['admin']}>
              <Register />
            </PrivateRoute>
          } />

          {/* edit uer info file */}
          <Route path="/edit-user/:userId" element={
            <PrivateRoute allowedRoles={['admin']}>
              <EditUser />
            </PrivateRoute>
          } />

          <Route path="/admin-dashboard" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />

          <Route path="/controleur-dashboard" element={
            <PrivateRoute allowedRoles={['controleur']}>
              <ControleurDashboard />
            </PrivateRoute>
          } />

          <Route path="/lecteur-dashboard" element={
            <PrivateRoute allowedRoles={['lecteur']}>
              <LecteurDashboard />
            </PrivateRoute>
          } />

          <Route path="/create-alert" element={
            <PrivateRoute allowedRoles={['admin', 'controleur']}>
              <CreateAlert />
            </PrivateRoute>
          } />
          <Route path="/lecteur-alert" element={
            <PrivateRoute allowedRoles={['lecteur']}>
              <LecteurAlert />
            </PrivateRoute>
          } />

          <Route path="/interface" element={
            <PrivateRoute allowedRoles={['admin', 'controleur', 'lecteur']}>
              <InterfacePage />
            </PrivateRoute>
          } /> 

          {/* <Route path="/mapping-interface" element={
            <PrivateRoute allowedRoles={['admin', 'controleur', 'lecteur']}>
              <MappingInterface />
            </PrivateRoute>
          } /> */}

          {/* <Route path="/mapping-interface" element={
            <PrivateRoute allowedRoles={['admin', 'controleur']}>
              <Alertdshbord />
            </PrivateRoute>
          } /> */}



          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;