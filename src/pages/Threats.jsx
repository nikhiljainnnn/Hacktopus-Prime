import React, { useState } from 'react'
import { AlertTriangle, Mail, Smartphone, CreditCard, User, Shield, CheckCircle, XCircle, X } from 'lucide-react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Threats = () => {
  const [activeTab, setActiveTab] = useState('phishing')

  const threats = [
    {
      id: 'phishing',
      name: 'Phishing Emails & SMS',
      icon: Mail,
      color: 'bg-red-50 text-red-600',
      description: 'Fake emails and messages that trick you into revealing personal information',
      examples: [
        'Bank account suspended - click here to verify',
        'You won ₹10,000 - claim now',
        'Your Aadhaar needs verification',
        'Package delivery failed - reschedule here'
      ],
      prevention: [
        'Never click on suspicious links',
        'Check sender email address carefully',
        'Don\'t share OTP or passwords',
        'Verify with official sources'
      ]
    },
    {
      id: 'upi',
      name: 'UPI Payment Scams',
      icon: Smartphone,
      color: 'bg-orange-50 text-orange-600',
      description: 'Scams targeting UPI payments and digital transactions',
      examples: [
        'Fake UPI QR codes at shops',
        'Payment requests from unknown numbers',
        'Refund scams asking for payment',
        'Fake customer care numbers'
      ],
      prevention: [
        'Verify UPI ID before payment',
        'Never share UPI PIN',
        'Check transaction details carefully',
        'Use trusted payment apps only'
      ]
    },
    {
      id: 'otp',
      name: 'OTP & Verification Fraud',
      icon: CreditCard,
      color: 'bg-yellow-50 text-yellow-600',
      description: 'Scams involving fake OTP requests and verification calls',
      examples: [
        'Fake bank calls asking for OTP',
        'OTP sharing for "verification"',
        'Fake customer care calls',
        'SMS with fake OTP requests'
      ],
      prevention: [
        'Never share OTP with anyone',
        'Banks never ask for OTP on call',
        'Verify caller identity',
        'Don\'t call back unknown numbers'
      ]
    },
    {
      id: 'identity',
      name: 'Identity Theft',
      icon: User,
      color: 'bg-purple-50 text-purple-600',
      description: 'Stealing personal information to commit fraud',
      examples: [
        'Fake job offers asking for documents',
        'Aadhaar/PAN verification scams',
        'Social media profile cloning',
        'Fake loan applications'
      ],
      prevention: [
        'Never share Aadhaar/PAN photos',
        'Use strong, unique passwords',
        'Enable 2FA on all accounts',
        'Monitor bank statements regularly'
      ]
    }
  ]

  const currentThreat = threats.find(threat => threat.id === activeTab)

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Reduced spacing */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Cyber Threats & Prevention</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about common cyber threats in India and how to protect yourself
          </p>
        </div>

        {/* Threat Categories - Reduced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {threats.map((threat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setActiveTab(threat.id)}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${threat.color}`}>
                  <threat.icon className={`h-5 w-5 ${threat.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{threat.name}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">{threat.description}</p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${threat.color}`}>
                  {threat.name}
                </span>
                <span className="text-blue-600 text-sm font-medium">Learn More →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Threat Details - Reduced spacing */}
        {currentThreat && (
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${currentThreat.color}`}>
                  <currentThreat.icon className={`h-6 w-6 ${currentThreat.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentThreat.name}</h2>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${currentThreat.color}`}>
                    {currentThreat.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('phishing')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threat Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What is it?</h3>
                <p className="text-gray-600 mb-4">{currentThreat.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How it works</h3>
                <ul className="space-y-2 mb-4">
                  {currentThreat.examples.map((example, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-600 text-sm">{example}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Warning Signs</h3>
                <ul className="space-y-2">
                  {currentThreat.prevention.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">⚠</span>
                      <span className="text-gray-600 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention & Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Protect Yourself</h3>
                <ul className="space-y-2 mb-4">
                  {currentThreat.prevention.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-600 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Real Examples</h3>
                <div className="space-y-3">
                  {currentThreat.examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg border-l-4 border-red-500">
                      <p className="text-gray-800 text-sm font-medium mb-1">{example}</p>
                      <p className="text-gray-600 text-xs">{example}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-blue-900 font-semibold text-sm mb-1">Emergency Action</h4>
                  <p className="text-blue-800 text-xs">
                    If you've fallen victim to this threat, immediately contact the cyber crime helpline at 1930 or visit cybercrime.gov.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Safety Tips - Reduced spacing */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Quick Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Enable 2FA on all accounts</h3>
              <p className="text-blue-800 text-xs">Use strong, unique passwords</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Use strong, unique passwords</h3>
              <p className="text-blue-800 text-xs">Enable 2FA on all accounts</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Keep software updated</h3>
              <p className="text-blue-800 text-xs">Use strong, unique passwords</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">Verify before sharing information</h3>
              <p className="text-blue-800 text-xs">Enable 2FA on all accounts</p>
            </div>
          </div>
        </div>

        {/* Call to Action - Reduced spacing */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-3">Want to test your knowledge?</p>
          <Link
            to="/quiz"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <span>Take Safety Quiz</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Threats
