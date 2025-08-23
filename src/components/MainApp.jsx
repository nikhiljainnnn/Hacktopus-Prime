import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/Home';
import Threats from '../pages/Threats';
import Demographics from '../pages/Demographics';

import Quiz from '../pages/Quiz';
import Help from '../pages/Help';
import Report from '../pages/Report';
import ThreatSimulator from '../pages/ThreatSimulator';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import SafetyScore from '../pages/SafetyScore';
import Chatbot from './Chatbot';

const MainApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/threats" element={<Threats />} />
          <Route path="/demographics" element={<Demographics />} />
  
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/help" element={<Help />} />
          <Route path="/report" element={<Report />} />
          <Route path="/simulator" element={<ThreatSimulator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/safety-score" element={<SafetyScore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MainApp;