const mongoose = require('mongoose');
const CyberAttack = require('../models/CyberAttack');
require('dotenv').config();

// Sample data for cyber attacks
const sampleAttacks = [
  // Phishing attacks
  {
    type: 'phishing',
    severity: 'high',
    demographic: 'student',
    state: 'Maharashtra',
    city: 'Mumbai',
    ageGroup: '18-25',
    financialLoss: 25000,
    isResolved: false,
    description: 'Fake scholarship email claiming to offer financial aid',
    attackVector: 'email',
    tags: ['scholarship', 'financial_aid', 'student']
  },
  {
    type: 'phishing',
    severity: 'medium',
    demographic: 'professional',
    state: 'Karnataka',
    city: 'Bangalore',
    ageGroup: '26-35',
    financialLoss: 15000,
    isResolved: true,
    description: 'Fake job offer email with malicious attachment',
    attackVector: 'email',
    tags: ['job_offer', 'attachment', 'professional']
  },
  {
    type: 'phishing',
    severity: 'critical',
    demographic: 'senior_citizen',
    state: 'Delhi',
    city: 'New Delhi',
    ageGroup: '65+',
    financialLoss: 50000,
    isResolved: false,
    description: 'Fake bank security alert email',
    attackVector: 'email',
    tags: ['bank', 'security', 'senior']
  },

  // UPI Scams
  {
    type: 'upi_scam',
    severity: 'high',
    demographic: 'homemaker',
    state: 'Tamil Nadu',
    city: 'Chennai',
    ageGroup: '36-45',
    financialLoss: 35000,
    isResolved: true,
    description: 'Fake UPI payment request for online shopping',
    attackVector: 'sms',
    tags: ['upi', 'shopping', 'payment']
  },
  {
    type: 'upi_scam',
    severity: 'critical',
    demographic: 'business_owner',
    state: 'Gujarat',
    city: 'Ahmedabad',
    ageGroup: '46-55',
    financialLoss: 100000,
    isResolved: false,
    description: 'Fake vendor payment request',
    attackVector: 'phone_call',
    tags: ['business', 'vendor', 'payment']
  },
  {
    type: 'upi_scam',
    severity: 'medium',
    demographic: 'rural_user',
    state: 'Uttar Pradesh',
    city: 'Lucknow',
    ageGroup: '26-35',
    financialLoss: 20000,
    isResolved: true,
    description: 'Fake government scheme payment',
    attackVector: 'sms',
    tags: ['government', 'scheme', 'rural']
  },

  // Social Media Fraud
  {
    type: 'social_media_fraud',
    severity: 'high',
    demographic: 'student',
    state: 'Telangana',
    city: 'Hyderabad',
    ageGroup: '18-25',
    financialLoss: 30000,
    isResolved: false,
    description: 'Fake Instagram giveaway scam',
    attackVector: 'social_media',
    tags: ['instagram', 'giveaway', 'social']
  },
  {
    type: 'social_media_fraud',
    severity: 'medium',
    demographic: 'professional',
    state: 'West Bengal',
    city: 'Kolkata',
    ageGroup: '26-35',
    financialLoss: 18000,
    isResolved: true,
    description: 'Fake LinkedIn job opportunity',
    attackVector: 'social_media',
    tags: ['linkedin', 'job', 'professional']
  },

  // Identity Theft
  {
    type: 'identity_theft',
    severity: 'critical',
    demographic: 'senior_citizen',
    state: 'Rajasthan',
    city: 'Jaipur',
    ageGroup: '65+',
    financialLoss: 75000,
    isResolved: false,
    description: 'Aadhaar card details stolen through fake call',
    attackVector: 'phone_call',
    tags: ['aadhaar', 'identity', 'senior']
  },
  {
    type: 'identity_theft',
    severity: 'high',
    demographic: 'professional',
    state: 'Punjab',
    city: 'Chandigarh',
    ageGroup: '36-45',
    financialLoss: 45000,
    isResolved: true,
    description: 'PAN card details compromised',
    attackVector: 'website',
    tags: ['pan', 'identity', 'professional']
  },

  // Ransomware
  {
    type: 'ransomware',
    severity: 'critical',
    demographic: 'business_owner',
    state: 'Kerala',
    city: 'Kochi',
    ageGroup: '46-55',
    financialLoss: 200000,
    isResolved: false,
    description: 'Business files encrypted by ransomware',
    attackVector: 'email',
    tags: ['ransomware', 'business', 'files']
  },

  // Data Breach
  {
    type: 'data_breach',
    severity: 'high',
    demographic: 'professional',
    state: 'Haryana',
    city: 'Gurgaon',
    ageGroup: '26-35',
    financialLoss: 0,
    isResolved: true,
    description: 'Personal data leaked from compromised website',
    attackVector: 'website',
    tags: ['data_breach', 'personal', 'website']
  },

  // Malware
  {
    type: 'malware',
    severity: 'medium',
    demographic: 'student',
    state: 'Bihar',
    city: 'Patna',
    ageGroup: '18-25',
    financialLoss: 12000,
    isResolved: true,
    description: 'Malware downloaded from fake software site',
    attackVector: 'website',
    tags: ['malware', 'software', 'student']
  },

  // Vishing
  {
    type: 'vishing',
    severity: 'high',
    demographic: 'homemaker',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    ageGroup: '36-45',
    financialLoss: 28000,
    isResolved: false,
    description: 'Fake bank representative call',
    attackVector: 'phone_call',
    tags: ['vishing', 'bank', 'call']
  }
];

// Generate additional random attacks for better data distribution
const generateRandomAttacks = (count = 50) => {
  const types = ['phishing', 'upi_scam', 'social_media_fraud', 'identity_theft', 'ransomware', 'data_breach', 'malware', 'vishing'];
  const severities = ['low', 'medium', 'high', 'critical'];
  const demographics = ['student', 'professional', 'homemaker', 'rural_user', 'senior_citizen', 'business_owner'];
  const states = ['Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Gujarat', 'Uttar Pradesh', 'Telangana', 'West Bengal', 'Rajasthan', 'Punjab', 'Kerala', 'Haryana', 'Bihar', 'Madhya Pradesh'];
  const cities = ['Mumbai', 'Bangalore', 'New Delhi', 'Chennai', 'Ahmedabad', 'Lucknow', 'Hyderabad', 'Kolkata', 'Jaipur', 'Chandigarh', 'Kochi', 'Gurgaon', 'Patna', 'Bhopal'];
  const ageGroups = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];
  const attackVectors = ['email', 'sms', 'phone_call', 'social_media', 'website', 'app', 'public_wifi', 'other'];

  const randomAttacks = [];

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const demographic = demographics[Math.floor(Math.random() * demographics.length)];
    const stateIndex = Math.floor(Math.random() * states.length);
    const ageGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
    const attackVector = attackVectors[Math.floor(Math.random() * attackVectors.length)];
    
    // Generate random financial loss based on severity
    let financialLoss;
    switch (severity) {
      case 'low':
        financialLoss = Math.floor(Math.random() * 5000) + 1000;
        break;
      case 'medium':
        financialLoss = Math.floor(Math.random() * 15000) + 5000;
        break;
      case 'high':
        financialLoss = Math.floor(Math.random() * 50000) + 15000;
        break;
      case 'critical':
        financialLoss = Math.floor(Math.random() * 200000) + 50000;
        break;
    }

    // Generate random timestamp within last 90 days
    const timestamp = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    
    // 70% chance of being resolved
    const isResolved = Math.random() > 0.3;

    randomAttacks.push({
      type,
      severity,
      demographic,
      state: states[stateIndex],
      city: cities[stateIndex],
      ageGroup,
      financialLoss,
      isResolved,
      description: `Sample ${type} attack in ${cities[stateIndex]}`,
      attackVector,
      timestamp,
      resolvedAt: isResolved ? new Date(timestamp.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : null,
      tags: [type, demographic, attackVector]
    });
  }

  return randomAttacks;
};

const seedDashboardData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await CyberAttack.deleteMany({});
    console.log('Cleared existing cyber attack data');

    // Insert sample attacks
    const allAttacks = [...sampleAttacks, ...generateRandomAttacks(100)];
    
    await CyberAttack.insertMany(allAttacks);
    console.log(`Inserted ${allAttacks.length} cyber attack records`);

    // Log some statistics
    const totalAttacks = await CyberAttack.countDocuments();
    const totalLoss = await CyberAttack.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$financialLoss' }
        }
      }
    ]);

    console.log('\n📊 Dashboard Data Seeded Successfully!');
    console.log(`Total Attacks: ${totalAttacks}`);
    console.log(`Total Financial Loss: ₹${totalLoss[0]?.total?.toLocaleString() || 0}`);
    console.log('\n🎯 Sample data includes:');
    console.log('- Various attack types (phishing, UPI scams, etc.)');
    console.log('- Different demographics and age groups');
    console.log('- Geographic distribution across India');
    console.log('- Realistic financial losses');
    console.log('- Timestamps spanning the last 90 days');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding dashboard data:', error);
    process.exit(1);
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDashboardData();
}

module.exports = { seedDashboardData, generateRandomAttacks };
