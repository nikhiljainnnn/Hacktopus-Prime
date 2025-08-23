import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, TrendingUp, Award, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CyberShield</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Stay Safe in the
            <span className="text-blue-600"> Digital World</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn essential cyber safety skills through interactive quizzes, real-time threat alerts, 
            and personalized learning paths designed for all demographics across India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">
            Why Choose CyberShield?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Protection</h3>
              <p className="text-gray-600">
                Learn about all types of cyber threats including phishing, UPI scams, social media fraud, and more.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Demographic Focused</h3>
              <p className="text-gray-600">
                Tailored content for students, professionals, homemakers, rural users, and senior citizens.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your learning journey with detailed analytics and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Interactive Quizzes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Threat Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Secure Your Digital Life?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of users who are already learning to stay safe online.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">CyberShield</span>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering India with cyber safety knowledge
          </p>
          <div className="text-sm text-gray-500">
            © 2024 CyberShield. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;