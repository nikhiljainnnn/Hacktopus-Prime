const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'fill-in-blank'],
    default: 'multiple-choice'
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required']
  },
  explanation: {
    type: String,
    trim: true,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  points: {
    type: Number,
    default: 10
  },
  category: {
    type: String,
    required: [true, 'Question category is required'],
    enum: ['phishing', 'social-media', 'online-shopping', 'banking', 'upi-scams', 'general']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Quiz title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Quiz description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Quiz category is required'],
    enum: ['beginner', 'intermediate', 'advanced', 'specialized']
  },
  targetDemographic: {
    type: String,
    required: [true, 'Target demographic is required'],
    enum: ['students', 'professionals', 'homemakers', 'rural-users', 'senior-citizens', 'all']
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number, // in minutes
    default: 30,
    min: [5, 'Time limit must be at least 5 minutes'],
    max: [120, 'Time limit cannot exceed 120 minutes']
  },
  passingScore: {
    type: Number,
    default: 70, // percentage
    min: [50, 'Passing score must be at least 50%'],
    max: [100, 'Passing score cannot exceed 100%']
  },
  maxAttempts: {
    type: Number,
    default: 3,
    min: [1, 'Max attempts must be at least 1']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  estimatedDuration: {
    type: Number, // in minutes
    default: 15
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }],
  learningObjectives: [{
    type: String,
    trim: true
  }],
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['article', 'video', 'infographic', 'tool']
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total questions count
quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

// Virtual for total possible points
quizSchema.virtual('totalPoints').get(function() {
  return this.questions.reduce((total, question) => total + question.points, 0);
});

// Indexes for better query performance
quizSchema.index({ category: 1, targetDemographic: 1 });
quizSchema.index({ difficulty: 1 });
quizSchema.index({ isActive: 1, isPublic: 1 });
quizSchema.index({ createdAt: -1 });
quizSchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to calculate estimated duration
quizSchema.pre('save', function(next) {
  if (this.isModified('questions')) {
    // Estimate 1 minute per question
    this.estimatedDuration = Math.max(5, this.questions.length);
  }
  next();
});

// Static method to find active public quizzes
quizSchema.statics.findActivePublic = function() {
  return this.find({ isActive: true, isPublic: true });
};

// Static method to find quizzes by demographic
quizSchema.statics.findByDemographic = function(demographic) {
  return this.find({
    isActive: true,
    isPublic: true,
    $or: [
      { targetDemographic: demographic },
      { targetDemographic: 'all' }
    ]
  });
};

// Static method to find quizzes by category and difficulty
quizSchema.statics.findByCategoryAndDifficulty = function(category, difficulty) {
  return this.find({
    isActive: true,
    isPublic: true,
    category: category,
    difficulty: difficulty
  });
};

module.exports = mongoose.model('Quiz', quizSchema);