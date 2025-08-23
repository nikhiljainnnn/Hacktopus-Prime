const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  selectedAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  points: {
    type: Number,
    default: 0
  }
});

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [answerSchema],
  score: {
    type: Number,
    required: true,
    min: 0
  },
  totalPoints: {
    type: Number,
    required: true,
    min: 0
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  passed: {
    type: Boolean,
    required: true
  },
  timeStarted: {
    type: Date,
    required: true,
    default: Date.now
  },
  timeCompleted: {
    type: Date
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  attemptNumber: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned', 'timed-out'],
    default: 'in-progress'
  },
  feedback: {
    overall: {
      type: String,
      enum: ['excellent', 'good', 'average', 'needs-improvement', 'poor'],
      default: 'average'
    },
    strengths: [String],
    weaknesses: [String],
    recommendations: [String]
  },
  certificate: {
    issued: {
      type: Boolean,
      default: false
    },
    issuedAt: Date,
    certificateId: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for duration in minutes
quizAttemptSchema.virtual('durationMinutes').get(function() {
  return Math.round(this.timeSpent / 60 * 100) / 100;
});

// Virtual for time remaining (if quiz is in progress)
quizAttemptSchema.virtual('timeRemaining').get(function() {
  if (this.status !== 'in-progress') return 0;
  
  const quizTimeLimit = this.quiz?.timeLimit || 30; // default 30 minutes
  const timeElapsed = (Date.now() - this.timeStarted.getTime()) / (1000 * 60); // in minutes
  return Math.max(0, quizTimeLimit - timeElapsed);
});

// Indexes for better query performance
quizAttemptSchema.index({ user: 1, quiz: 1 });
quizAttemptSchema.index({ user: 1, createdAt: -1 });
quizAttemptSchema.index({ quiz: 1, score: -1 });
quizAttemptSchema.index({ status: 1 });
quizAttemptSchema.index({ passed: 1 });

// Pre-save middleware to calculate score and percentage
quizAttemptSchema.pre('save', function(next) {
  if (this.isModified('answers')) {
    // Calculate score
    this.score = this.answers.reduce((total, answer) => {
      return total + (answer.isCorrect ? answer.points : 0);
    }, 0);
    
    // Calculate total possible points
    this.totalPoints = this.answers.reduce((total, answer) => {
      return total + answer.points;
    }, 0);
    
    // Calculate percentage
    this.percentage = this.totalPoints > 0 ? Math.round((this.score / this.totalPoints) * 100) : 0;
    
    // Determine if passed (assuming 70% is passing)
    this.passed = this.percentage >= 70;
    
    // Set feedback based on performance
    if (this.percentage >= 90) {
      this.feedback.overall = 'excellent';
    } else if (this.percentage >= 80) {
      this.feedback.overall = 'good';
    } else if (this.percentage >= 70) {
      this.feedback.overall = 'average';
    } else if (this.percentage >= 60) {
      this.feedback.overall = 'needs-improvement';
    } else {
      this.feedback.overall = 'poor';
    }
  }
  
  if (this.isModified('status') && this.status === 'completed') {
    this.timeCompleted = new Date();
    this.timeSpent = Math.round((this.timeCompleted - this.timeStarted) / 1000); // in seconds
  }
  
  next();
});

// Static method to find user's quiz attempts
quizAttemptSchema.statics.findByUser = function(userId, options = {}) {
  const query = { user: userId };
  
  if (options.quiz) query.quiz = options.quiz;
  if (options.status) query.status = options.status;
  if (options.passed !== undefined) query.passed = options.passed;
  
  return this.find(query)
    .populate('quiz', 'title category difficulty')
    .sort({ createdAt: -1 });
};

// Static method to find best attempt for a user and quiz
quizAttemptSchema.statics.findBestAttempt = function(userId, quizId) {
  return this.findOne({ user: userId, quiz: quizId })
    .sort({ score: -1, timeSpent: 1 })
    .populate('quiz', 'title category difficulty');
};

// Static method to get user statistics
quizAttemptSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalAttempts: { $sum: 1 },
        totalQuizzes: { $addToSet: '$quiz' },
        totalScore: { $sum: '$score' },
        totalPoints: { $sum: '$totalPoints' },
        passedAttempts: { $sum: { $cond: ['$passed', 1, 0] } },
        averageScore: { $avg: '$percentage' },
        totalTimeSpent: { $sum: '$timeSpent' }
      }
    }
  ]);
  
  if (stats.length === 0) {
    return {
      totalAttempts: 0,
      totalQuizzes: 0,
      totalScore: 0,
      totalPoints: 0,
      passedAttempts: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      successRate: 0
    };
  }
  
  const stat = stats[0];
  return {
    totalAttempts: stat.totalAttempts,
    totalQuizzes: stat.totalQuizzes.length,
    totalScore: stat.totalScore,
    totalPoints: stat.totalPoints,
    passedAttempts: stat.passedAttempts,
    averageScore: Math.round(stat.averageScore * 100) / 100,
    totalTimeSpent: stat.totalTimeSpent,
    successRate: Math.round((stat.passedAttempts / stat.totalAttempts) * 100)
  };
};

// Instance method to check if user can attempt quiz again
quizAttemptSchema.methods.canRetake = function() {
  const maxAttempts = this.quiz?.maxAttempts || 3;
  return this.attemptNumber < maxAttempts;
};

// Instance method to generate certificate
quizAttemptSchema.methods.generateCertificate = function() {
  if (this.passed && !this.certificate.issued) {
    this.certificate.issued = true;
    this.certificate.issuedAt = new Date();
    this.certificate.certificateId = `CERT-${this._id.toString().slice(-8).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    return this.certificate.certificateId;
  }
  return null;
};

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);