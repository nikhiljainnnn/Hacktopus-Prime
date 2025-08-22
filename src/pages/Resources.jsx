import React from 'react'
import { Download, ExternalLink, Shield, Phone, Mail, FileText, Video, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react'

const Resources = () => {
  const tools = [
    {
      name: 'Password Strength Checker',
      description: 'Test the strength of your passwords',
      icon: Shield,
      color: 'bg-green-50 text-green-600',
      action: 'Check Password',
      external: false
    },
    {
      name: 'Email Header Analyzer',
      description: 'Analyze suspicious email headers',
      icon: Mail,
      color: 'bg-blue-50 text-blue-600',
      action: 'Analyze Email',
      external: false
    },
    {
      name: 'URL Safety Checker',
      description: 'Check if a URL is safe to visit',
      icon: ExternalLink,
      color: 'bg-purple-50 text-purple-600',
      action: 'Check URL',
      external: false
    },
    {
      name: 'Two-Factor Authentication Guide',
      description: 'Step-by-step 2FA setup guide',
      icon: Shield,
      color: 'bg-orange-50 text-orange-600',
      action: 'View Guide',
      external: false
    }
  ]

  const guides = [
    {
      title: 'Complete Cyber Safety Guide',
      description: 'Comprehensive guide covering all aspects of online safety',
      icon: BookOpen,
      color: 'bg-blue-50 text-blue-600',
      download: true,
      size: '2.5 MB'
    },
    {
      title: 'UPI Safety Checklist',
      description: 'Essential checklist for safe UPI transactions',
      icon: FileText,
      color: 'bg-green-50 text-green-600',
      download: true,
      size: '500 KB'
    },
    {
      title: 'Social Media Privacy Guide',
      description: 'How to protect your privacy on social media platforms',
      icon: Shield,
      color: 'bg-purple-50 text-purple-600',
      download: true,
      size: '1.2 MB'
    },
    {
      title: 'Senior Citizens Digital Safety',
      description: 'Specialized guide for elderly users',
      icon: BookOpen,
      color: 'bg-red-50 text-red-600',
      download: true,
      size: '1.8 MB'
    }
  ]

  const emergencyContacts = [
    {
      name: 'Cyber Crime Helpline',
      number: '1930',
      description: '24/7 cyber crime reporting',
      icon: Phone,
      color: 'bg-red-50 text-red-600'
    },
    {
      name: 'Police Emergency',
      number: '100',
      description: 'General police emergency',
      icon: Phone,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: 'Women safety and support',
      icon: Phone,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      name: 'Senior Citizens Helpline',
      number: '14567',
      description: 'Elderly support and assistance',
      icon: Phone,
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  const onlineResources = [
    {
      name: 'Cyber Crime Portal',
      url: 'cybercrime.gov.in',
      description: 'Official government portal for cyber crime reporting',
      icon: ExternalLink,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Digital India',
      url: 'digitalindia.gov.in',
      description: 'Government digital initiatives and resources',
      icon: ExternalLink,
      color: 'bg-green-50 text-green-600'
    },
    {
      name: 'CERT-In',
      url: 'cert-in.org.in',
      description: 'Indian Computer Emergency Response Team',
      icon: ExternalLink,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      name: 'RBI Security Guidelines',
      url: 'rbi.org.in',
      description: 'Banking security guidelines and alerts',
      icon: ExternalLink,
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cyber Safety Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tools, guides, and resources to help you stay safe online. Everything you need in one place.
          </p>
        </div>

        {/* Safety Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <button className="btn-primary w-full">
                  {tool.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Downloadable Guides */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Downloadable Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${guide.color} flex items-center justify-center flex-shrink-0`}>
                    <guide.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{guide.title}</h3>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Size: {guide.size}</span>
                      <button className="btn-primary flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className={`w-12 h-12 rounded-lg ${contact.color} flex items-center justify-center mb-4`}>
                  <contact.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{contact.name}</h3>
                <div className="text-2xl font-bold text-primary-600 mb-2">{contact.number}</div>
                <p className="text-gray-600">{contact.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Online Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Official Online Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onlineResources.map((resource, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg ${resource.color} flex items-center justify-center flex-shrink-0`}>
                    <resource.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{resource.name}</h3>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{resource.url}</span>
                      <button className="btn-secondary flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4" />
                        <span>Visit</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Safety Checklist */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Safety Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Account Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Enable 2FA on all accounts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Use strong, unique passwords</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Regular password updates</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Device Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Keep software updated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Install antivirus software</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Enable device encryption</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Online Behavior</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Verify before sharing info</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Use trusted websites only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Monitor financial statements</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Report Cyber Crime */}
        <section className="mt-12 bg-red-50 border border-red-200 rounded-xl p-8">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-4">Report Cyber Crime</h2>
            <p className="text-red-800 mb-6">
              If you've been a victim of cyber crime, report it immediately to help prevent others from falling prey to the same scam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Report Online (cybercrime.gov.in)
              </button>
              <button className="btn-secondary">
                Call 1930 (24/7 Helpline)
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Resources
