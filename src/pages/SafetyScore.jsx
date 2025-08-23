import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Award, Target, BarChart3, Star, Zap, Users } from 'lucide-react';

const SafetyScore = () => {
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate loading score
  useEffect(() => {
    const loadScore = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setScore(85); // Mock score
      setLoading(false);
    };
    loadScore();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', icon: Award, color: 'text-green-600' };
    if (score >= 75) return { level: 'Good', icon: Shield, color: 'text-blue-600' };
    if (score >= 60) return { level: 'Fair', icon: AlertTriangle, color: 'text-yellow-600' };
    return { level: 'Poor', icon: AlertTriangle, color: 'text-red-600' };
  };

  const scoreLevel = getScoreLevel(score);

  const categories = [
    {
      name: 'Password Security',
      score: 92,
      icon: Shield,
      color: 'text-green-600',
      tips: ['Use strong, unique passwords', 'Enable two-factor authentication', 'Use a password manager']
    },
    {
      name: 'Social Media Safety',
      score: 78,
      icon: Users,
      color: 'text-blue-600',
      tips: ['Review privacy settings regularly', 'Be careful with personal information', 'Verify friend requests']
    },
    {
      name: 'Email Security',
      score: 85,
      icon: Zap,
      color: 'text-blue-600',
      tips: ['Don\'t click suspicious links', 'Verify sender addresses', 'Use spam filters']
    },
    {
      name: 'Financial Safety',
      score: 88,
      icon: Target,
      color: 'text-green-600',
      tips: ['Use secure payment methods', 'Monitor transactions regularly', 'Never share OTP']
    },
    {
      name: 'Device Security',
      score: 82,
      icon: Shield,
      color: 'text-blue-600',
      tips: ['Keep software updated', 'Use antivirus software', 'Enable device encryption']
    },
    {
      name: 'Public WiFi',
      score: 65,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      tips: ['Avoid sensitive transactions', 'Use VPN when possible', 'Turn off file sharing']
    }
  ];

  const recommendations = [
    {
      priority: 'High',
      title: 'Improve Public WiFi Security',
      description: 'Your public WiFi security score is lower than average. Consider using a VPN and avoiding sensitive transactions on public networks.',
      action: 'Learn More',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      priority: 'Medium',
      title: 'Enhance Social Media Privacy',
      description: 'Review your social media privacy settings and be more cautious about sharing personal information.',
      action: 'Review Settings',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      priority: 'Low',
      title: 'Maintain Current Practices',
      description: 'Your password and financial security practices are excellent. Keep up the good work!',
      action: 'Continue',
      color: 'bg-green-50 border-green-200 text-green-800'
    }
  ];

  const recentActivities = [
    { action: 'Completed Threat Simulator', score: '+5', date: '2 hours ago', icon: CheckCircle },
    { action: 'Updated Password', score: '+3', date: '1 day ago', icon: Shield },
    { action: 'Completed Safety Quiz', score: '+8', date: '3 days ago', icon: Award },
    { action: 'Enabled 2FA', score: '+10', date: '1 week ago', icon: CheckCircle },
    { action: 'Reported Suspicious Email', score: '+2', date: '1 week ago', icon: AlertTriangle }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your safety score...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Award className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Safety Score</h1>
          <p className="text-xl text-gray-600">Track your cyber safety progress and get personalized recommendations</p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <scoreLevel.icon className={`h-16 w-16 ${scoreLevel.color}`} />
              <div className="text-left">
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>{score}</div>
                <div className="text-2xl font-semibold text-gray-600">/ 100</div>
              </div>
            </div>
            <div className={`text-2xl font-bold ${scoreLevel.color} mb-2`}>{scoreLevel.level}</div>
            <p className="text-gray-600 mb-6">
              {score >= 90 ? 'Outstanding! You\'re a cyber safety champion!' :
               score >= 75 ? 'Great job! You\'re well protected against most threats.' :
               score >= 60 ? 'Good start! There\'s room for improvement.' :
               'You need to improve your cyber safety practices.'}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  score >= 90 ? 'bg-green-500' :
                  score >= 75 ? 'bg-blue-500' :
                  score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm text-gray-600">
              <span>Poor (0-59)</span>
              <span>Fair (60-74)</span>
              <span>Good (75-89)</span>
              <span>Excellent (90-100)</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'categories', name: 'Categories', icon: Target },
                { id: 'recommendations', name: 'Recommendations', icon: TrendingUp },
                { id: 'activity', name: 'Recent Activity', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">+15</div>
                  <div className="text-sm text-gray-600">Points this month</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4/6</div>
                  <div className="text-sm text-gray-600">Categories above 80%</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">90</div>
                  <div className="text-sm text-gray-600">Target score</div>
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      </div>
                      <div className={`text-2xl font-bold ${category.color}`}>{category.score}%</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${category.color.replace('text-', 'bg-')}`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Tips to improve:</p>
                      {category.tips.map((tip, tipIndex) => (
                        <div key={tipIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`border rounded-lg p-6 ${rec.color}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-white bg-opacity-50">
                            {rec.priority} Priority
                          </span>
                          <h3 className="font-semibold">{rec.title}</h3>
                        </div>
                        <p className="text-sm mb-4">{rec.description}</p>
                        <button className="px-4 py-2 bg-white bg-opacity-50 rounded-lg text-sm font-medium hover:bg-opacity-75 transition-colors">
                          {rec.action}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <activity.icon className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.date}</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">{activity.score}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Take Safety Quiz</span>
            </button>
            <button className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>View Progress</span>
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Tips</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyScore;
