import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, GraduationCap, Briefcase, Home, MapPin, User, Shield, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react'

const Demographics = () => {
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

  // Initialize with the first demographic object, not just the ID
  const [selectedDemo, setSelectedDemo] = useState(demographics[0])

  const handleDemoSelect = (demo) => {
    setSelectedDemo(demo)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Reduced spacing */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Tailored Safety Information</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get personalized cyber safety tips based on your demographic profile
          </p>
        </div>

        {/* Demographic Selection - Reduced spacing */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {demographics.map((demo) => (
              <button
                key={demo.id}
                onClick={() => handleDemoSelect(demo)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedDemo?.id === demo.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <demo.icon className={`h-5 w-5 ${demo.color}`} />
                  <span className="font-medium text-gray-900">{demo.name}</span>
                </div>
                <p className="text-xs text-gray-600">{demo.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Demographic Info - Reduced spacing */}
        {selectedDemo && (
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${selectedDemo.color}`}>
                  <selectedDemo.icon className={`h-6 w-6 ${selectedDemo.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDemo.name}</h2>
                  <p className="text-gray-600">{selectedDemo.description}</p>
                </div>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
              >
                <BarChart3 className="h-4 w-4" />
                <span>View Dashboard</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Common Threats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Common Threats</h3>
                <div className="space-y-3">
                  {selectedDemo.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-900 text-sm">{risk}</h4>
                        <p className="text-red-800 text-xs">{risk}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Tips */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Tips</h3>
                <div className="space-y-3">
                  {selectedDemo.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-green-900 text-sm">{tip}</h4>
                        <p className="text-green-800 text-xs">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedDemo.resources.map((resource, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-center mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{resource}</h4>
                    <p className="text-gray-600 text-xs">{resource}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Statistics Overview - Reduced spacing */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">45%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Students Affected</div>
              <div className="text-xs text-gray-600">Most vulnerable group</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">32%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Professionals</div>
              <div className="text-xs text-gray-600">Corporate threats</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">18%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Homemakers</div>
              <div className="text-xs text-gray-600">Shopping scams</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">5%</div>
              <div className="text-sm font-medium text-gray-900 mb-1">Others</div>
              <div className="text-xs text-gray-600">Rural & seniors</div>
            </div>
          </div>
        </div>

        {/* Call to Action - Reduced spacing */}
        <div className="text-center">
          <p className="text-gray-600 mb-3">Ready to learn more about cyber safety?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/threats"
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Learn About Threats</span>
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Take Safety Quiz</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demographics
