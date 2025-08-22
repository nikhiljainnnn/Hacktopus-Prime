import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Threats from './pages/Threats'
import Demographics from './pages/Demographics'
import Resources from './pages/Resources'
import Quiz from './pages/Quiz'
import Help from './pages/Help'
import Report from './pages/Report'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/demographics" element={<Demographics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/help" element={<Help />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
