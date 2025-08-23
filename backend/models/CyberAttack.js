const mongoose = require('mongoose');

const cyberAttackSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['phishing', 'upi_scam', 'social_media_fraud', 'identity_theft', 'ransomware', 'data_breach', 'malware', 'vishing']
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical']
  },
  demographic: {
    type: String,
    required: true,
    enum: ['student', 'professional', 'homemaker', 'rural_user', 'senior_citizen', 'business_owner']
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+']
  },
  financialLoss: {
    type: Number,
    default: 0,
    min: 0
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  attackVector: {
    type: String,
    required: true,
    enum: ['email', 'sms', 'phone_call', 'social_media', 'website', 'app', 'public_wifi', 'other']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
cyberAttackSchema.index({ type: 1, timestamp: -1 });
cyberAttackSchema.index({ demographic: 1, timestamp: -1 });
cyberAttackSchema.index({ state: 1, timestamp: -1 });
cyberAttackSchema.index({ severity: 1, timestamp: -1 });
cyberAttackSchema.index({ timestamp: -1 });

// Virtual for calculating time since attack
cyberAttackSchema.virtual('timeSinceAttack').get(function() {
  return Date.now() - this.timestamp.getTime();
});

// Static method to get attack statistics
cyberAttackSchema.statics.getAttackStats = async function(timeframe = '30d') {
  const now = new Date();
  let startDate;
  
  switch(timeframe) {
    case '7d':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30d':
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90d':
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case '1y':
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  const stats = await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalAttacks: { $sum: 1 },
        totalLoss: { $sum: '$financialLoss' },
        resolvedAttacks: {
          $sum: { $cond: ['$isResolved', 1, 0] }
        },
        avgLoss: { $avg: '$financialLoss' }
      }
    }
  ]);

  return stats[0] || {
    totalAttacks: 0,
    totalLoss: 0,
    resolvedAttacks: 0,
    avgLoss: 0
  };
};

// Static method to get attacks by type
cyberAttackSchema.statics.getAttacksByType = async function(timeframe = '30d') {
  const now = new Date();
  let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  if (timeframe === '7d') {
    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (timeframe === '90d') {
    startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  } else if (timeframe === '1y') {
    startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  }

  return await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        totalLoss: { $sum: '$financialLoss' },
        avgLoss: { $avg: '$financialLoss' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Static method to get attacks by demographic
cyberAttackSchema.statics.getAttacksByDemographic = async function(timeframe = '30d') {
  const now = new Date();
  let startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  if (timeframe === '7d') {
    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (timeframe === '90d') {
    startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  } else if (timeframe === '1y') {
    startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  }

  return await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$demographic',
        count: { $sum: 1 },
        totalLoss: { $sum: '$financialLoss' },
        avgLoss: { $avg: '$financialLoss' }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Static method to get monthly trends
cyberAttackSchema.statics.getMonthlyTrends = async function() {
  const now = new Date();
  const startDate = new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000); // 12 months

  return await this.aggregate([
    {
      $match: {
        timestamp: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$timestamp' },
          month: { $month: '$timestamp' }
        },
        count: { $sum: 1 },
        totalLoss: { $sum: '$financialLoss' }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
};

module.exports = mongoose.model('CyberAttack', cyberAttackSchema);
