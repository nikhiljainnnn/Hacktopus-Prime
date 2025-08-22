import React, { useState } from 'react'
import { Users, GraduationCap, Briefcase, Home, MapPin, User, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

const Demographics = () => {
  const [selectedDemo, setSelectedDemo] = useState('students')

  const demographics = [
    {
      id: 'students',
      name: 'Students',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600',
      description: 'Young learners navigating the digital world',
      risks: [
        'Social media privacy issues',
        'Online gaming scams',
        'Fake job offers',
        'Educational app frauds'
      ],
      tips: [
        'Never share personal photos online',
        'Verify job offers through official channels',
        'Use strong passwords for educational accounts',
        'Be careful with online gaming purchases'
      ],
      resources: [
        'Digital literacy programs',
        'Safe social media guidelines',
        'Career counseling resources'
      ]
    },
    {
      id: 'professionals',
      name: 'Working Professionals',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600',
      description: 'Corporate employees and business owners',
      risks: [
        'Corporate email phishing',
        'Business email compromise',
        'Data breach threats',
        'Financial fraud targeting salary accounts'
      ],
      tips: [
        'Use company VPN and security tools',
        'Never share work credentials',
        'Enable 2FA on all work accounts',
        'Report suspicious emails to IT department'
      ],
      resources: [
        'Corporate security policies',
        'Data protection guidelines',
        'Financial fraud prevention'
      ]
    },
    {
      id: 'homemakers',
      name: 'Homemakers',
      icon: Home,
      color: 'bg-purple-50 text-purple-600',
      description: 'Managing household and family digital safety',
      risks: [
        'Online shopping scams',
        'Fake customer care calls',
        'Social media privacy issues',
        'Family member account security'
      ],
      tips: [
        'Use trusted e-commerce platforms only',
        'Never share OTP with customer care',
        'Monitor children\'s online activities',
        'Keep family devices updated'
      ],
      resources: [
        'Safe online shopping guides',
        'Family digital safety tips',
        'Parental control tools'
      ]
    },
    {
      id: 'rural',
      name: 'Rural Users',
      icon: MapPin,
      color: 'bg-orange-50 text-orange-600',
      description: 'Users in rural areas with limited digital literacy',
      risks: [
        'Fake government schemes',
        'Aadhaar/PAN verification scams',
        'Banking fraud through agents',
        'Mobile recharge scams'
      ],
      tips: [
        'Verify government schemes on official websites',
        'Never share Aadhaar/PAN photos',
        'Use official banking apps only',
        'Get help from trusted family members'
      ],
      resources: [
        'Digital literacy programs',
        'Government scheme verification',
        'Banking safety guidelines'
      ]
    },
    {
      id: 'seniors',
      name: 'Senior Citizens',
      icon: User,
      color: 'bg-red-50 text-red-600',
      description: 'Elderly users who may be less tech-savvy',
      risks: [
        'Fake health insurance calls',
        'Pension and banking fraud',
        'Fake investment schemes',
        'Social engineering attacks'
      ],
      tips: [
        'Never share banking details on phone',
        'Verify investment schemes with family',
        'Use simple, secure passwords',
        'Ask family for help with online activities'
      ],
      resources: [
        'Senior-friendly digital guides',
        'Family support resources',
        'Emergency contact lists'
      ]
    }
  ]

  const currentDemo = demographics.find(demo => demo.id === selectedDemo)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tailored Safety for Different Demographics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every demographic faces unique cyber threats. Find personalized safety guidance for your group.
          </p>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {demographics.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className={`p-4 rounded-lg text-center transition-all duration-200 ${
                selectedDemo === demo.id
                  ? 'bg-primary-50 border-2 border-primary-200 shadow-lg'
                  : 'bg-white hover:bg-gray-50 border-2 border-transparent shadow'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg ${demo.color} flex items-center justify-center mx-auto mb-3`}>
                <demo.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{demo.name}</h3>
              <p className="text-xs text-gray-600">{demo.description}</p>
            </button>
          ))}
        </div>

        {/* Detailed Information */}
        {currentDemo && (
          <div className="space-y-8">
            {/* Risks Section */}
            <div className="card">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Common Risks for {currentDemo.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDemo.risks.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Safety Tips for {currentDemo.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDemo.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="card">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Helpful Resources</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentDemo.resources.map((resource, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-blue-800 font-medium">{resource}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* General Advice */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Universal Safety Principles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Verify Everything</h4>
              <p className="text-gray-600 text-sm">Always verify information from official sources before taking action</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
              <p className="text-gray-600 text-sm">Keep your devices and apps updated with the latest security patches</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ask for Help</h4>
              <p className="text-gray-600 text-sm">Don't hesitate to ask trusted family members or friends for help</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4 text-center">Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900 block">Cyber Crime</strong>
              <div className="text-red-700">1930</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900 block">Police</strong>
              <div className="text-red-700">100</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900 block">Women Helpline</strong>
              <div className="text-red-700">1091</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <strong className="text-red-900 block">Senior Citizens</strong>
              <div className="text-red-700">14567</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demographics
