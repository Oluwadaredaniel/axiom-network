import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2, Cpu } from 'lucide-react';
import { Layout } from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const CapabilityDetails = lazy(() => import('./pages/CapabilityDetails'));
const Conductor = lazy(() => import('./pages/Conductor'));
const Wallet = lazy(() => import('./pages/Wallet'));
const DeveloperPortal = lazy(() => import('./pages/DeveloperPortal'));
const ExecutionHistory = lazy(() => import('./pages/ExecutionHistory'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        <div className="w-20 h-20 border-[4px] border-white/5 border-t-primary rounded-full animate-spin" />
      </div>
      <div className="flex items-center gap-3 text-charcoal-500 font-black text-[10px] uppercase tracking-[0.3em]">
        <Cpu size={16} className="animate-pulse" />
        Initializing Node...
      </div>
    </div>
  );
}

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
