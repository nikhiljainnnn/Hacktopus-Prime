import React, { useState } from 'react';
import { Shield, AlertTriangle, Users, Smartphone, CreditCard, BookOpen, CheckCircle, ArrowRight, Home, Briefcase, GraduationCap, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SafetyGuide = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    ageGroup: '',
    occupation: '',
    techSavviness: '',
    primaryConcerns: []
  });

  const ageGroups = [
    { value: '18-25', label: '18-25 years', icon: GraduationCap },
    { value: '26-35', label: '26-35 years', icon: Briefcase },
    { value: '36-45', label: '36-45 years', icon: User },
    { value: '46-55', label: '46-55 years', icon: User },
    { value: '55+', label: '55+ years', icon: User }
  ];

  const occupations = [
    { value: 'student', label: 'Student', icon: GraduationCap },
    { value: 'professional', label: 'Working Professional', icon: Briefcase },
    { value: 'homemaker', label: 'Homemaker', icon: Home },
    { value: 'senior_citizen', label: 'Senior Citizen', icon: User },
    { value: 'business_owner', label: 'Business Owner', icon: Briefcase }
  ];

  const techLevels = [
    { value: 'beginner', label: 'Beginner - Learning basics', icon: BookOpen },
    { value: 'intermediate', label: 'Intermediate - Regular user', icon: Smartphone },
    { value: 'advanced', label: 'Advanced - Tech-savvy', icon: Shield }
  ];

  const concerns = [
    { value: 'upi_scams', label: 'UPI & Payment Scams', icon: CreditCard },
    { value: 'phishing', label: 'Phishing & Fake Emails', icon: AlertTriangle },
    { value: 'social_media', label: 'Social Media Safety', icon: Users },
    { value: 'online_shopping', label: 'Online Shopping Safety', icon: Smartphone },
    { value: 'data_privacy', label: 'Data Privacy', icon: Shield },
    { value: 'fake_calls', label: 'Fake OTP Calls', icon: AlertTriangle }
  ];

  const handleProfileUpdate = (field, value) => {
    if (field === 'primaryConcerns') {
      const updatedConcerns = userProfile.primaryConcerns.includes(value)
        ? userProfile.primaryConcerns.filter(c => c !== value)
        : [...userProfile.primaryConcerns, value];
      setUserProfile({ ...userProfile, [field]: updatedConcerns });
    } else {
      setUserProfile({ ...userProfile, [field]: value });
    }
  };

  const generateSafetyGuide = () => {
    const guide = {
      title: 'Your Personalized Cyber Safety Guide',
      summary: `Based on your profile as a ${userProfile.ageGroup} ${userProfile.occupation} with ${userProfile.techSavviness} tech skills, here's your customized safety plan.`,
      recommendations: [],
      priorityActions: [],
      resources: []
    };

    // Age-based recommendations
    if (userProfile.ageGroup === '18-25') {
      guide.recommendations.push({
        title: 'Social Media Safety',
        description: 'Be careful about what you share online. Review privacy settings regularly.',
        priority: 'high',
        icon: Users
      });
    } else if (userProfile.ageGroup === '55+') {
      guide.recommendations.push({
        title: 'Verify Before You Trust',
        description: 'Always verify caller identity and never share OTP with anyone.',
        priority: 'critical',
        icon: AlertTriangle
      });
    }

    // Occupation-based recommendations
    if (userProfile.occupation === 'student') {
      guide.recommendations.push({
        title: 'Educational Resource Safety',
        description: 'Be cautious of fake educational websites and scholarship scams.',
        priority: 'medium',
        icon: GraduationCap
      });
    } else if (userProfile.occupation === 'business_owner') {
      guide.recommendations.push({
        title: 'Business Account Security',
        description: 'Use separate accounts for business and personal transactions.',
        priority: 'high',
        icon: Shield
      });
    }

    // Tech level-based recommendations
    if (userProfile.techSavviness === 'beginner') {
      guide.recommendations.push({
        title: 'Start with Basics',
        description: 'Learn about strong passwords and two-factor authentication.',
        priority: 'high',
        icon: BookOpen
      });
    }

    // Concern-based recommendations
    userProfile.primaryConcerns.forEach(concern => {
      if (concern === 'upi_scams') {
        guide.recommendations.push({
          title: 'UPI Safety Rules',
          description: 'Never scan unknown QR codes. Always verify payment details.',
          priority: 'critical',
          icon: CreditCard
        });
      } else if (concern === 'phishing') {
        guide.recommendations.push({
          title: 'Email Safety',
          description: 'Check sender email addresses carefully. Don\'t click suspicious links.',
          priority: 'high',
          icon: AlertTriangle
        });
      }
    });

    // Priority actions
    guide.priorityActions = [
      'Enable two-factor authentication on all accounts',
      'Install a reliable antivirus software',
      'Keep all apps and software updated',
      'Backup important data regularly',
      'Learn to recognize common scam patterns'
    ];

    // Resources
    guide.resources = [
      { title: 'Cyber Crime Helpline', value: '1930', type: 'emergency' },
      { title: 'Report Cyber Crime', value: 'cybercrime.gov.in', type: 'website' },
      { title: 'Safety Tips App', value: 'Download Truecaller', type: 'app' }
    ];

    return guide;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Safety Guide</h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's create a personalized cyber safety plan just for you. 
              This will take just a few minutes and will help us provide the most relevant safety tips.
            </p>
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Safety Assessment
            </button>
          </div>
        );

      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your age group?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ageGroups.map((age) => (
                <button
                  key={age.value}
                  onClick={() => handleProfileUpdate('ageGroup', age.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    userProfile.ageGroup === age.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <age.icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{age.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(0)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              {userProfile.ageGroup && (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your occupation?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {occupations.map((occupation) => (
                <button
                  key={occupation.value}
                  onClick={() => handleProfileUpdate('occupation', occupation.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    userProfile.occupation === occupation.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <occupation.icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{occupation.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              {userProfile.occupation && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you rate your tech skills?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {techLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => handleProfileUpdate('techSavviness', level.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    userProfile.techSavviness === level.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <level.icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{level.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              {userProfile.techSavviness && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What are your main cyber safety concerns?</h2>
            <p className="text-gray-600 mb-6">Select all that apply:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {concerns.map((concern) => (
                <button
                  key={concern.value}
                  onClick={() => handleProfileUpdate('primaryConcerns', concern.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    userProfile.primaryConcerns.includes(concern.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <concern.icon className="h-6 w-6 text-blue-600" />
                    <span className="font-medium">{concern.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              {userProfile.primaryConcerns.length > 0 && (
                <button
                  onClick={() => setCurrentStep(5)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Generate My Guide →
                </button>
              )}
            </div>
          </div>
        );

      case 5:
        const guide = generateSafetyGuide();
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{guide.title}</h2>
              <p className="text-lg text-gray-600">{guide.summary}</p>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Personalized Recommendations</h3>
              <div className="space-y-4">
                {guide.recommendations.map((rec, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        rec.priority === 'critical' ? 'bg-red-100' :
                        rec.priority === 'high' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <rec.icon className={`h-6 w-6 ${
                          rec.priority === 'critical' ? 'text-red-600' :
                          rec.priority === 'high' ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h4>
                        <p className="text-gray-600">{rec.description}</p>
                        <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${
                          rec.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'high' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Actions */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Priority Actions to Take Today</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <ul className="space-y-3">
                  {guide.priorityActions.map((action, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Resources */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Essential Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guide.resources.map((resource, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                    <p className="text-blue-600 font-medium">{resource.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentStep(0)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SafetyGuide;
