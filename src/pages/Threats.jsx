import React, { useState } from 'react'
import { AlertTriangle, Mail, Smartphone, CreditCard, User, Shield, CheckCircle, XCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Common Cyber Threats in India
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about the most common cyber threats targeting Indians and how to protect yourself from them.
          </p>
        </div>

        {/* Threat Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {threats.map((threat) => (
              <button
                key={threat.id}
                onClick={() => setActiveTab(threat.id)}
                className={`p-4 rounded-lg text-left transition-all duration-200 ${
                  activeTab === threat.id
                    ? 'bg-primary-50 border-2 border-primary-200'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${threat.color} flex items-center justify-center mb-3`}>
                  <threat.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{threat.name}</h3>
                <p className="text-sm text-gray-600">{threat.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Threat Details */}
        {currentThreat && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Examples */}
            <div className="card">
              <div className="flex items-center mb-6">
                <XCircle className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Common Examples</h2>
              </div>
              <div className="space-y-4">
                {currentThreat.examples.map((example, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention */}
            <div className="card">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">How to Protect Yourself</h2>
              </div>
              <div className="space-y-4">
                {currentThreat.prevention.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Section */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            <h3 className="text-xl font-bold text-red-900">Emergency Contacts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900">Cyber Crime Helpline:</strong>
              <div className="text-red-700">1930</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900">Police Emergency:</strong>
              <div className="text-red-700">100</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900">Online Portal:</strong>
              <div className="text-red-700">cybercrime.gov.in</div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">General Safety Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Enable 2FA on all accounts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Use strong, unique passwords</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Keep software updated</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Verify before sharing information</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Monitor bank statements regularly</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span className="text-blue-800">Report suspicious activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Threats
