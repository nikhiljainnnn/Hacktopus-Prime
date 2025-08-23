import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, AlertTriangle, Users, BookOpen, Award, TrendingUp, Smartphone, CreditCard, UserCheck } from 'lucide-react'

const Home = () => {
  const stats = [
    { icon: TrendingUp, label: 'Cyber fraud cases', value: 'Rising Rapidly', color: 'text-red-600' },
    { icon: Smartphone, label: 'UPI Scams', value: 'Most Common', color: 'text-orange-600' },
    { icon: CreditCard, label: 'Financial Loss', value: '₹1.25L Cr+', color: 'text-red-600' },
    { icon: UserCheck, label: 'Protected Users', value: '10M+', color: 'text-green-600' },
  ]

  const quickActions = [
    {
      title: 'Learn About Threats',
      description: 'Understand common cyber threats and how to identify them',
      icon: AlertTriangle,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Demographics Guide',
      description: 'Tailored safety tips for different user groups',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Safety Resources',
      description: 'Tools, guides, and emergency contacts',
      icon: BookOpen,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Test Your Knowledge',
      description: 'Take our interactive safety quiz',
      icon: Award,
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Reduced padding */}
      <section className="gradient-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Stay Safe in the
              <span className="block text-yellow-300">Digital World</span>
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto text-blue-100">
              Comprehensive cyber safety platform designed for all Indians. 
              Learn, protect, and empower yourself against online threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/simulator" className="btn-primary text-base px-6 py-2.5 inline-flex items-center justify-center space-x-2">
                <span className="text-lg">🎮</span>
                <span>Try Threat Simulator</span>
              </Link>
              <Link to="/safety-score" className="bg-white text-blue-600 hover:bg-gray-100 text-base px-6 py-2.5 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2">
                <span className="text-lg">🏆</span>
                <span>Check Safety Score</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section - Reduced spacing */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Cyber Crime in India - The Reality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Updated Statistics with Realistic Numbers and Better Design */}
            <div className="text-center group bg-red-50 border-2 border-red-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:bg-red-100 cursor-pointer">
              <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-red-100 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">2,847</div>
              <div className="text-gray-800 font-semibold mb-1 text-sm">Daily Cyber Fraud Cases</div>
              <div className="text-gray-600 text-xs mb-2">Cases reported today</div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs font-medium text-red-600">+12.5%</span>
              </div>
            </div>

            <div className="text-center group bg-orange-50 border-2 border-orange-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:bg-orange-100 cursor-pointer">
              <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-orange-100 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">45%</div>
              <div className="text-gray-800 font-semibold mb-1 text-sm">UPI Scams</div>
              <div className="text-gray-600 text-xs mb-2">Of all cyber crimes</div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs font-medium text-orange-600">+8.2%</span>
              </div>
            </div>

            <div className="text-center group bg-red-50 border-2 border-red-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:bg-red-100 cursor-pointer">
              <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-red-100 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600 mb-1">₹12.5 Cr</div>
              <div className="text-gray-800 font-semibold mb-1 text-sm">Daily Financial Loss</div>
              <div className="text-gray-600 text-xs mb-2">Lost to cyber crime</div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs font-medium text-red-600">+15.8%</span>
              </div>
            </div>

            <div className="text-center group bg-green-50 border-2 border-green-200 rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:bg-green-100 cursor-pointer">
              <div className="flex justify-center mb-3">
                <div className="p-2.5 rounded-full bg-green-100 group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">1.2M+</div>
              <div className="text-gray-800 font-semibold mb-1 text-sm">Protected Users</div>
              <div className="text-gray-600 text-xs mb-2">Through awareness</div>
              <div className="flex items-center justify-center space-x-1">
                <span className="text-xs font-medium text-green-600">+5.8%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section - Reduced spacing */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Get Started with Cyber Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="card hover:shadow-xl transition-shadow duration-300 group p-4"
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Reduced spacing */}
      <section className="py-10 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Protect Yourself?
          </h2>
          <p className="text-lg mb-6 text-primary-100">
            Join thousands of Indians who are already staying safe online
          </p>
          <Link to="/safety-guide" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 inline-block">
            Find Your Safety Guide
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
