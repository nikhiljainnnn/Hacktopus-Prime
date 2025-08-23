const express = require('express');
const router = express.Router();
const CyberAttack = require('../models/CyberAttack');
const User = require('../models/User');
const QuizAttempt = require('../models/QuizAttempt');
const { protect: auth } = require('../middleware/auth');

// Get overall dashboard statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    
    // Get attack statistics
    const attackStats = await CyberAttack.getAttackStats(timeframe);
    
    // Get user statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({
      lastLoginAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });
    
    // Get quiz statistics
    const totalQuizAttempts = await QuizAttempt.countDocuments();
    const avgQuizScore = await QuizAttempt.aggregate([
      {
        $group: {
          _id: null,
          avgScore: { $avg: '$score' }
        }
      }
    ]);

    // Calculate resolution rate
    const resolutionRate = attackStats.totalAttacks > 0 
      ? (attackStats.resolvedAttacks / attackStats.totalAttacks * 100).toFixed(1)
      : 0;

    // Get recent attacks (last 24 hours)
    const recentAttacks = await CyberAttack.countDocuments({
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: {
        attacks: {
          total: attackStats.totalAttacks,
          resolved: attackStats.resolvedAttacks,
          resolutionRate: parseFloat(resolutionRate),
          recent24h: recentAttacks,
          totalLoss: attackStats.totalLoss,
          avgLoss: Math.round(attackStats.avgLoss || 0)
        },
        users: {
          total: totalUsers,
          active: activeUsers,
          activeRate: totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
        },
        quizzes: {
          totalAttempts: totalQuizAttempts,
          avgScore: Math.round(avgQuizScore[0]?.avgScore || 0)
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
});

// Get attacks by type
router.get('/attacks-by-type', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const attacksByType = await CyberAttack.getAttacksByType(timeframe);
    
    res.json({
      success: true,
      data: attacksByType
    });
  } catch (error) {
    console.error('Attacks by type error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attacks by type'
    });
  }
});

// Get attacks by demographic
router.get('/attacks-by-demographic', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const attacksByDemographic = await CyberAttack.getAttacksByDemographic(timeframe);
    
    res.json({
      success: true,
      data: attacksByDemographic
    });
  } catch (error) {
    console.error('Attacks by demographic error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attacks by demographic'
    });
  }
});

// Get monthly trends
router.get('/monthly-trends', auth, async (req, res) => {
  try {
    const monthlyTrends = await CyberAttack.getMonthlyTrends();
    
    // Format the data for charts
    const formattedData = monthlyTrends.map(trend => ({
      month: `${trend._id.year}-${String(trend._id.month).padStart(2, '0')}`,
      attacks: trend.count,
      loss: trend.totalLoss
    }));
    
    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Monthly trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly trends'
    });
  }
});

// Get attacks by age group
router.get('/attacks-by-age', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const now = new Date();
    let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (timeframe === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '90d') {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '1y') {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    const attacksByAge = await CyberAttack.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$ageGroup',
          count: { $sum: 1 },
          totalLoss: { $sum: '$financialLoss' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.json({
      success: true,
      data: attacksByAge
    });
  } catch (error) {
    console.error('Attacks by age error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attacks by age group'
    });
  }
});

// Get top affected states
router.get('/top-states', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const limit = parseInt(req.query.limit) || 10;
    
    const now = new Date();
    let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (timeframe === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '90d') {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '1y') {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    const topStates = await CyberAttack.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$state',
          count: { $sum: 1 },
          totalLoss: { $sum: '$financialLoss' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: limit
      }
    ]);

    res.json({
      success: true,
      data: topStates
    });
  } catch (error) {
    console.error('Top states error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching top affected states'
    });
  }
});

// Get real-time attack feed
router.get('/recent-attacks', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    const recentAttacks = await CyberAttack.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('reportedBy', 'firstName lastName email')
      .select('-__v');

    res.json({
      success: true,
      data: recentAttacks
    });
  } catch (error) {
    console.error('Recent attacks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent attacks'
    });
  }
});

// Get attack severity distribution
router.get('/severity-distribution', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const now = new Date();
    let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (timeframe === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '90d') {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '1y') {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    const severityDistribution = await CyberAttack.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 },
          totalLoss: { $sum: '$financialLoss' }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);

    res.json({
      success: true,
      data: severityDistribution
    });
  } catch (error) {
    console.error('Severity distribution error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching severity distribution'
    });
  }
});

// Get user engagement metrics
router.get('/user-engagement', auth, async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '30d';
    const now = new Date();
    let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    if (timeframe === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '90d') {
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else if (timeframe === '1y') {
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    }

    // Get quiz attempts in timeframe
    const quizAttempts = await QuizAttempt.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Get unique users who took quizzes
    const uniqueQuizUsers = await QuizAttempt.distinct('user', {
      createdAt: { $gte: startDate }
    });

    // Get new user registrations
    const newUsers = await User.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Get active users (logged in within timeframe)
    const activeUsers = await User.countDocuments({
      lastLoginAt: { $gte: startDate }
    });

    res.json({
      success: true,
      data: {
        quizAttempts,
        uniqueQuizUsers: uniqueQuizUsers.length,
        newUsers,
        activeUsers
      }
    });
  } catch (error) {
    console.error('User engagement error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user engagement metrics'
    });
  }
});

module.exports = router;
