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
import { Shield, TrendingUp, AlertTriangle, Users, Smartphone, CreditCard, UserCheck, BarChart3, PieChart, Activity, Loader2 } from 'lucide-react';
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockData = {
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
          { month: '2024-01', attacks: 1200 },
          { month: '2024-02', attacks: 1350 },
          { month: '2024-03', attacks: 1100 },
          { month: '2024-04', attacks: 1450 },
          { month: '2024-05', attacks: 1600 },
          { month: '2024-06', attacks: 1400 }
        ],
        attacksByAge: [
          { _id: '18-25', count: 42 },
          { _id: '26-35', count: 38 },
          { _id: '36-45', count: 28 },
          { _id: '46-55', count: 18 },
          { _id: '55+', count: 12 }
        ],
        recentAttacks: [
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
        ]
      };

      setDashboardData(mockData);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

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
        const [year, month] = item.month.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Attacks</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.attacks.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.attacks.resolutionRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Loss</p>
                  <p className="text-2xl font-bold text-gray-900">₹{dashboardData.stats.attacks.totalLoss.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.users.active.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Attacks by Type */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attacks by Type</h3>
            <div className="h-64">
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
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attacks by Demographic</h3>
            <div className="h-64">
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
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attack Trends</h3>
          <div className="h-80">
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
                  beginAtZero: true
                }
              }
            }} />
          </div>
        </div>

        {/* Age Group Distribution */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Attacks by Age Group</h3>
          <div className="h-64">
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
                  beginAtZero: true
                }
              }
            }} />
          </div>
        </div>

        {/* Recent Attacks Feed */}
        {dashboardData.recentAttacks.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
