const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      //bufferMaxEntries: 0, // Disable mongoose buffering
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('🟢 Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 Mongoose disconnected from MongoDB Atlas');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔄 MongoDB Atlas connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during MongoDB Atlas connection closure:', err);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔄 MongoDB Atlas connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during MongoDB Atlas connection closure:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ MongoDB Atlas connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;