import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Threats from './pages/Threats'
import Demographics from './pages/Demographics'
import Resources from './pages/Resources'
import Quiz from './pages/Quiz'
import Help from './pages/Help'
import Report from './pages/Report'
import ThreatSimulator from './pages/ThreatSimulator'
import Dashboard from './pages/Dashboard'
import SafetyGuide from './pages/SafetyGuide'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import MainApp from './components/MainApp'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'

function AppContent() {
  const location = useLocation()

  // List of routes where navbar should be hidden
  const hideNavbarRoutes = ['/', '/login', '/signup', '/forgot-password']

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideNavbar && <Navbar />}
      <main>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/threats" element={<Threats />} />
          <Route path="/demographics" element={<Demographics />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/help" element={<Help />} />
          <Route path="/report" element={<Report />} />
                             <Route path="/simulator" element={<ThreatSimulator />} />
                   <Route path="/dashboard" element={<Dashboard />} />
                   <Route path="/safety-guide" element={<SafetyGuide />} />

          <Route
            path="/safety-score"
            element={
              <div className="py-16 text-center text-2xl font-bold">
                Safety Score Page Coming Soon!
              </div>
            }
          />

          {/* Protected Home route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Protected main app route */}
          <Route
            path="/app/*"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
