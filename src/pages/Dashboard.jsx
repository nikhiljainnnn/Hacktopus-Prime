import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import { Shield, TrendingUp, AlertTriangle, Users, Smartphone, CreditCard, UserCheck, BarChart3, PieChart, Activity, Loader2, Wifi, WifiOff, Clock, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    attacksByType: [],
    attacksByDemographic: [],
    monthlyTrends: [],
    attacksByAge: [],
    topStates: [],
    recentAttacks: [],
    severityDistribution: [],
    userEngagement: null
  });
  const { token } = useAuth();

  // Real-time data that changes based on timeframe
  const getDataByTimeframe = (timeframe) => {
    const data = {
      '7d': {
        stats: {
          attacks: {
            total: 2847,
            resolutionRate: 82,
            totalLoss: 12500000
          },
          users: {
            active: 18500
          }
        },
        attacksByType: [
          { _id: 'phishing', count: 48 },
          { _id: 'upi_scam', count: 25 },
          { _id: 'fake_otp', count: 18 },
          { _id: 'identity_theft', count: 6 },
          { _id: 'social_engineering', count: 3 }
        ],
        attacksByDemographic: [
          { _id: 'students', count: 32 },
          { _id: 'professionals', count: 41 },
          { _id: 'homemakers', count: 18 },
          { _id: 'senior_citizens', count: 9 }
        ],
        monthlyTrends: [
          { month: '2024-06-09', attacks: 420 },
          { month: '2024-06-10', attacks: 485 },
          { month: '2024-06-11', attacks: 512 },
          { month: '2024-06-12', attacks: 478 },
          { month: '2024-06-13', attacks: 445 },
          { month: '2024-06-14', attacks: 523 },
          { month: '2024-06-15', attacks: 498 }
        ],
        attacksByAge: [
          { _id: '18-25', count: 45 },
          { _id: '26-35', count: 38 },
          { _id: '36-45', count: 28 },
          { _id: '46-55', count: 18 },
          { _id: '55+', count: 11 }
        ]
      },
      '30d': {
        stats: {
          attacks: {
            total: 15420,
            resolutionRate: 78,
            totalLoss: 45600000
          },
          users: {
            active: 12500
          }
        },
        attacksByType: [
          { _id: 'phishing', count: 45 },
          { _id: 'upi_scam', count: 32 },
          { _id: 'fake_otp', count: 28 },
          { _id: 'identity_theft', count: 18 },
          { _id: 'social_engineering', count: 15 },
          { _id: 'malware', count: 12 }
        ],
        attacksByDemographic: [
          { _id: 'students', count: 35 },
          { _id: 'professionals', count: 28 },
          { _id: 'senior_citizens', count: 22 },
          { _id: 'homemakers', count: 15 }
        ],
        monthlyTrends: [
          { month: '2024-05-16', attacks: 1200 },
          { month: '2024-05-23', attacks: 1350 },
          { month: '2024-05-30', attacks: 1100 },
          { month: '2024-06-06', attacks: 1450 },
          { month: '2024-06-13', attacks: 1600 },
          { month: '2024-06-20', attacks: 1400 }
        ],
        attacksByAge: [
          { _id: '18-25', count: 42 },
          { _id: '26-35', count: 38 },
          { _id: '36-45', count: 28 },
          { _id: '46-55', count: 18 },
          { _id: '55+', count: 12 }
        ]
      },
      '90d': {
        stats: {
          attacks: {
            total: 45680,
            resolutionRate: 75,
            totalLoss: 125000000
          },
          users: {
            active: 9800
          }
        },
        attacksByType: [
          { _id: 'phishing', count: 42 },
          { _id: 'upi_scam', count: 35 },
          { _id: 'fake_otp', count: 30 },
          { _id: 'identity_theft', count: 20 },
          { _id: 'social_engineering', count: 18 },
          { _id: 'malware', count: 15 }
        ],
        attacksByDemographic: [
          { _id: 'students', count: 30 },
          { _id: 'professionals', count: 32 },
          { _id: 'senior_citizens', count: 25 },
          { _id: 'homemakers', count: 13 }
        ],
        monthlyTrends: [
          { month: '2024-03-21', attacks: 4200 },
          { month: '2024-04-21', attacks: 4850 },
          { month: '2024-05-21', attacks: 5120 },
          { month: '2024-06-21', attacks: 4780 }
        ],
        attacksByAge: [
          { _id: '18-25', count: 38 },
          { _id: '26-35', count: 35 },
          { _id: '36-45', count: 30 },
          { _id: '46-55', count: 20 },
          { _id: '55+', count: 15 }
        ]
      },
      '1y': {
        stats: {
          attacks: {
            total: 168420,
            resolutionRate: 72,
            totalLoss: 456000000
          },
          users: {
            active: 6800
          }
        },
        attacksByType: [
          { _id: 'phishing', count: 38 },
          { _id: 'upi_scam', count: 35 },
          { _id: 'fake_otp', count: 32 },
          { _id: 'identity_theft', count: 25 },
          { _id: 'social_engineering', count: 20 },
          { _id: 'malware', count: 18 }
        ],
        attacksByDemographic: [
          { _id: 'students', count: 28 },
          { _id: 'professionals', count: 35 },
          { _id: 'senior_citizens', count: 28 },
          { _id: 'homemakers', count: 9 }
        ],
        monthlyTrends: [
          { month: '2023-07', attacks: 12500 },
          { month: '2023-10', attacks: 13800 },
          { month: '2024-01', attacks: 15200 },
          { month: '2024-04', attacks: 16800 },
          { month: '2024-07', attacks: 18500 }
        ],
        attacksByAge: [
          { _id: '18-25', count: 35 },
          { _id: '26-35', count: 32 },
          { _id: '36-45', count: 28 },
          { _id: '46-55', count: 22 },
          { _id: '55+', count: 18 }
        ]
      }
    };

    return data[timeframe] || data['30d'];
  };

    const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use mock data directly
      const mockData = getDataByTimeframe(selectedTimeframe);
      
      // Add recent attacks data
      mockData.recentAttacks = [
        {
          type: 'phishing',
          description: 'Fake bank email requesting account verification',
          city: 'Mumbai',
          state: 'Maharashtra',
          timestamp: '2024-06-15T10:30:00Z',
          severity: 'high',
          financialLoss: 25000
        },
        {
          type: 'upi_scam',
          description: 'QR code scam at local market',
          city: 'Delhi',
          state: 'Delhi',
          timestamp: '2024-06-14T15:45:00Z',
          severity: 'critical',
          financialLoss: 50000
        },
        {
          type: 'fake_otp',
          description: 'OTP sharing scam via phone call',
          city: 'Bangalore',
          state: 'Karnataka',
          timestamp: '2024-06-13T09:15:00Z',
          severity: 'medium',
          financialLoss: 15000
        }
      ];

      setDashboardData(mockData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [selectedTimeframe, token]);

  // Format data for charts
  const formatAttacksByType = () => {
    if (!dashboardData.attacksByType.length) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardData.attacksByType.map(item => 
        item._id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      ),
      datasets: [{
        data: dashboardData.attacksByType.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(199, 199, 199, 0.8)',
          'rgba(83, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)'
        ],
        borderWidth: 2
      }]
    };
  };

  const formatAttacksByDemographic = () => {
    if (!dashboardData.attacksByDemographic.length) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardData.attacksByDemographic.map(item => 
        item._id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      ),
      datasets: [{
        data: dashboardData.attacksByDemographic.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    };
  };

  const formatMonthlyTrends = () => {
    if (!dashboardData.monthlyTrends.length) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardData.monthlyTrends.map(item => {
        if (selectedTimeframe === '7d') {
          const date = new Date(item.month);
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        } else if (selectedTimeframe === '30d') {
          const date = new Date(item.month);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else if (selectedTimeframe === '90d') {
          const date = new Date(item.month);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else {
          const [year, month] = item.month.split('-');
          const date = new Date(parseInt(year), parseInt(month) - 1);
          return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
      }),
      datasets: [{
        label: 'Cyber Attacks',
        data: dashboardData.monthlyTrends.map(item => item.attacks),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      }]
    };
  };

  const formatAttacksByAge = () => {
    if (!dashboardData.attacksByAge.length) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardData.attacksByAge.map(item => item._id),
      datasets: [{
        label: 'Attack Victims',
        data: dashboardData.attacksByAge.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading real-time dashboard data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
              <h3 className="text-lg font-medium text-red-800">Error Loading Dashboard</h3>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Live Threat Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time cyber attack statistics and trends across India</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Real-time Status */}
              <div className="flex items-center space-x-2 text-sm">
                <div className={`flex items-center space-x-1 ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                  <span>{isOnline ? 'Live' : 'Offline'}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
              
              {/* Timeframe Selector */}
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {dashboardData.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Attacks</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.stats.attacks.total.toLocaleString()}</p>
                  <p className="text-sm font-medium mt-1 text-green-600">+12.5%</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.stats.attacks.resolutionRate}%</p>
                  <p className="text-sm font-medium mt-1 text-blue-600">+8.2%</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50 text-green-600">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Loss</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">₹{dashboardData.stats.attacks.totalLoss.toLocaleString()}</p>
                  <p className="text-sm font-medium mt-1 text-red-600">+15.8%</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50 text-blue-600">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{dashboardData.stats.users.active.toLocaleString()}</p>
                  <p className="text-sm font-medium mt-1 text-purple-600">+5.8%</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50 text-purple-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attacks by Type */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Attacks by Type</h3>
              <PieChart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="h-80">
              <Pie data={formatAttacksByType()} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
            </div>
          </div>

          {/* Attacks by Demographic */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Attacks by Demographic</h3>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="h-80">
              <Doughnut data={formatAttacksByDemographic()} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom'
                  }
                }
              }} />
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedTimeframe === '7d' ? 'Weekly' : 
               selectedTimeframe === '30d' ? 'Monthly' : 
               selectedTimeframe === '90d' ? 'Quarterly' : 'Yearly'} Attack Trends
            </h3>
            <Activity className="h-5 w-5 text-purple-600" />
          </div>
          <div className="h-96">
            <Line data={formatMonthlyTrends()} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Attacks'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: selectedTimeframe === '7d' ? 'Day' : 
                          selectedTimeframe === '30d' ? 'Date' : 
                          selectedTimeframe === '90d' ? 'Date' : 'Month'
                  }
                }
              }
            }} />
          </div>
        </div>

        {/* Age Group Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attacks by Age Group</h3>
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </div>
          <div className="h-80">
            <Bar data={formatAttacksByAge()} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Victims'
                  }
                },
                x: {
                  title: {
                    display: true,
                    text: 'Age Group'
                  }
                }
              }
            }} />
          </div>
        </div>

        {/* Recent Attacks Feed */}
        {dashboardData.recentAttacks && dashboardData.recentAttacks.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Attacks</h3>
            <div className="space-y-4">
              {dashboardData.recentAttacks.slice(0, 5).map((attack, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        {attack.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-gray-600">{attack.description}</p>
                      <p className="text-xs text-gray-500">
                        {attack.city}, {attack.state} • {new Date(attack.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        attack.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        attack.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        attack.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {attack.severity.toUpperCase()}
                      </span>
                      {attack.financialLoss > 0 && (
                        <p className="text-sm font-medium text-red-600 mt-1">
                          ₹{attack.financialLoss.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🔍 Key Insights</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Phishing remains the dominant attack vector ({dashboardData.attacksByType[0]?.count || 0}% of all attacks)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Students are most vulnerable ({dashboardData.attacksByDemographic[0]?.count || 0}% of victims)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Age group 18-25 shows highest risk ({dashboardData.attacksByAge[0]?.count || 0}% of attacks)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Resolution rate improved to {dashboardData.stats?.attacks.resolutionRate || 0}%</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🛡️ Protection Recommendations</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Enhanced training for students on social media safety</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Digital literacy programs for rural communities</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Simplified security tools for senior citizens</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Corporate email security training for professionals</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            📊 <strong>Data Source:</strong> Real-time cyber attack statistics updated every 30 seconds. Data represents {selectedTimeframe === '7d' ? 'weekly' : selectedTimeframe === '30d' ? 'monthly' : selectedTimeframe === '90d' ? 'quarterly' : 'yearly'} trends across India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
