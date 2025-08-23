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
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Stay Safe in the
              <span className="block text-yellow-300">Digital World</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Comprehensive cyber safety platform designed for all Indians. 
              Learn, protect, and empower yourself against online threats.
            </p>
                                                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <Link to="/simulator" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center space-x-2">
                          <span className="text-xl">🎮</span>
                          <span>Try Threat Simulator</span>
                        </Link>
                       <Link to="/safety-score" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2">
                          <span className="text-xl">🏆</span>
                          <span>Check Safety Score</span>
                        </Link>
                     </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Cyber Crime in India - The Reality
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Get Started with Cyber Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="card hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Yourself?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of Indians who are already staying safe online
          </p>
          <Link to="/safety-guide" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
            Find Your Safety Guide
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
