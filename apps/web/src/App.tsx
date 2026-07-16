import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import CapabilityDetails from './pages/CapabilityDetails'
import Conductor from './pages/Conductor'
import Wallet from './pages/Wallet'
import DeveloperPortal from './pages/DeveloperPortal'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ExecutionHistory from './pages/ExecutionHistory'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/:id" element={<CapabilityDetails />} />
      <Route path="/conductor" element={<Conductor />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/developer" element={<DeveloperPortal />} />
      <Route path="/history" element={<ExecutionHistory />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
