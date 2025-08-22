import React, { useState } from 'react';
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
import { Shield, TrendingUp, AlertTriangle, Users, Smartphone, CreditCard, UserCheck, BarChart3, PieChart, Activity } from 'lucide-react';

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
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  // Sample data - will be replaced with real data from backend
  const demographicAttackData = {
    students: 28,
    professionals: 35,
    homemakers: 22,
    rural: 12,
    seniors: 3
  };

  const threatTypeData = {
    phishing: 45,
    upi_scams: 30,
    fake_calls: 15,
    social_media: 8,
    job_scams: 2
  };

  const monthlyTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    students: [120, 135, 142, 128, 156, 168],
    professionals: [180, 195, 210, 185, 220, 235],
    homemakers: [95, 108, 115, 102, 125, 132],
    rural: [45, 52, 58, 48, 62, 68],
    seniors: [12, 15, 18, 14, 20, 22]
  };

  const ageGroupData = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'],
    datasets: [{
      label: 'Attack Victims',
      data: [320, 450, 380, 290, 180, 95],
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

  const pieChartData = {
    labels: ['Students', 'Professionals', 'Homemakers', 'Rural Users', 'Senior Citizens'],
    datasets: [{
      data: [
        demographicAttackData.students,
        demographicAttackData.professionals,
        demographicAttackData.homemakers,
        demographicAttackData.rural,
        demographicAttackData.seniors
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    }]
  };

  const threatTypeChartData = {
    labels: ['Phishing', 'UPI Scams', 'Fake Calls', 'Social Media', 'Job Scams'],
    datasets: [{
      data: [
        threatTypeData.phishing,
        threatTypeData.upi_scams,
        threatTypeData.fake_calls,
        threatTypeData.social_media,
        threatTypeData.job_scams
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 2
    }]
  };

  const lineChartData = {
    labels: monthlyTrends.labels,
    datasets: [
      {
        label: 'Students',
        data: monthlyTrends.students,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Professionals',
        data: monthlyTrends.professionals,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Homemakers',
        data: monthlyTrends.homemakers,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Rural Users',
        data: monthlyTrends.rural,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Senior Citizens',
        data: monthlyTrends.seniors,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Cyber Attack Distribution',
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Attack Trends by Demographics',
      },
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
          text: 'Month'
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Attack Victims by Age Group',
      },
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
  };

  const stats = [
    {
      title: 'Total Attacks',
      value: '1,715',
      change: '+12.5%',
      changeType: 'increase',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Most Vulnerable',
      value: 'Professionals',
      change: '35%',
      changeType: 'percentage',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Most Common Threat',
      value: 'Phishing',
      change: '45%',
      changeType: 'percentage',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Protected Users',
      value: '10M+',
      change: '+8.2%',
      changeType: 'increase',
      icon: UserCheck,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cyber Attack Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time insights into cyber threats across different demographics</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm font-medium mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Demographics Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Attack Distribution by Demographics</h3>
              <PieChart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="h-80">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(demographicAttackData).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <span className="text-sm font-bold text-blue-600">{value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Threat Types Doughnut Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Threat Types Distribution</h3>
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="h-80">
              <Doughnut data={threatTypeChartData} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(threatTypeData).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium capitalize">{key.replace('_', ' ')}</span>
                  <span className="text-sm font-bold text-green-600">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Chart - Monthly Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Attack Trends</h3>
            <Activity className="h-5 w-5 text-purple-600" />
          </div>
          <div className="h-96">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart - Age Groups */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attack Victims by Age Group</h3>
            <BarChart3 className="h-5 w-5 text-orange-600" />
          </div>
          <div className="h-80">
            <Bar data={ageGroupData} options={barChartOptions} />
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🔍 Key Insights</h3>
            <ul className="space-y-3 text-blue-800">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Professionals are most targeted (35%) due to higher financial capacity</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Phishing remains the dominant attack vector (45% of all attacks)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Rural users show increasing vulnerability (12% vs 8% last year)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Age group 26-35 is most affected (450 victims)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🛡️ Protection Recommendations</h3>
            <ul className="space-y-3 text-green-800">
              <li className="flex items-start space-x-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Enhanced training for professionals on corporate email security</span>
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
                <span>Social media safety workshops for students</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Data Source Note */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            📊 <strong>Data Source:</strong> Sample data for demonstration. Real-time data will be integrated when backend is connected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
