import React from 'react'
import { Link } from 'react-router-dom'
import { HelpCircle, Phone, Mail, MessageCircle, FileText, Shield, Users, BookOpen } from 'lucide-react'

const Help = () => {
  const helpCategories = [
    {
      icon: Shield,
      title: 'Security Issues',
      description: 'Get help with account security, password issues, and suspicious activities',
      link: '/threats',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: Users,
      title: 'Account Help',
      description: 'Account creation, login problems, and profile management',
      link: '/profile',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description: 'Access guides, tutorials, and educational materials',
      link: '/safety-guide',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: FileText,
      title: 'Reporting Issues',
      description: 'Report cyber crimes and technical problems',
      link: '/report',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      contact: '+91-1800-XXX-XXXX',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: 'support@cybershield.com',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available 24/7',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  const faqs = [
    {
      question: 'How do I report a cyber crime?',
      answer: 'You can report cyber crimes through our Report page or directly contact the cyber crime helpline at 1930.'
    },
    {
      question: 'What should I do if I suspect a phishing attempt?',
      answer: 'Do not click on suspicious links, report the incident immediately, and contact your bank if financial information was shared.'
    },
    {
      question: 'How can I improve my cyber safety?',
      answer: 'Take our safety quiz, read our guides, and stay updated with the latest threats and prevention methods.'
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we follow strict security protocols and never share your personal information with third parties.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Reduced spacing */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-lg text-gray-600">
            Get help with any questions or issues you might have
          </p>
        </div>

        {/* Help Categories - Reduced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {helpCategories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>

        {/* Contact Methods - Reduced spacing */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`w-12 h-12 rounded-lg ${method.color} flex items-center justify-center mx-auto mb-3`}>
                  <method.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                <p className="text-blue-600 font-medium">{method.contact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs - Reduced spacing */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Section - Reduced spacing */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
          <h2 className="text-xl font-semibold text-red-900 mb-3">🚨 Emergency Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600 mb-1">1930</div>
              <div className="text-sm font-medium text-red-900">Cyber Crime Helpline</div>
              <div className="text-xs text-red-700">Available 24/7</div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600 mb-1">100</div>
              <div className="text-sm font-medium text-red-900">Police Emergency</div>
              <div className="text-xs text-red-700">Immediate assistance</div>
            </div>
          </div>
        </div>

        {/* Additional Resources - Reduced spacing */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Still need help? Check out our comprehensive resources</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/safety-guide"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Safety Guide</span>
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Shield className="h-4 w-4" />
              <span>Take Quiz</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
