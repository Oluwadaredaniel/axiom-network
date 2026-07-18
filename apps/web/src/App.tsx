import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import CapabilityDetails from './pages/CapabilityDetails';
import Conductor from './pages/Conductor';
import Wallet from './pages/Wallet';
import DeveloperPortal from './pages/DeveloperPortal';
import ExecutionHistory from './pages/ExecutionHistory';
import AdminPage from './pages/AdminPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Layout } from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Authenticated Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Layout><Dashboard /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/marketplace"
          element={isAuthenticated ? <Layout><Marketplace /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/marketplace/:id"
          element={isAuthenticated ? <Layout><CapabilityDetails /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/conductor"
          element={isAuthenticated ? <Layout><Conductor /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/wallet"
          element={isAuthenticated ? <Layout><Wallet /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/developer"
          element={isAuthenticated ? <Layout><DeveloperPortal /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <Layout><ExecutionHistory /></Layout> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={isAuthenticated ? <Layout><AdminPage /></Layout> : <Navigate to="/login" />}
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
