const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/service-center';
  const dbName = process.env.MONGODB_DB_NAME || undefined; // Atlas connection string usually embeds db name

  try {
    await mongoose.connect(uri, {
      dbName,
      // These options work for both MongoDB Atlas (mongodb+srv) and local deployments
      serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 5000),
      maxPoolSize: Number(process.env.MONGODB_MAX_POOL_SIZE || 10),
      retryWrites: true,
      w: 'majority',
      autoIndex: true
    });

    console.log(`✅ MongoDB connected (${mongoose.connection.host})`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw error;
  }
}

module.exports = connectDB;
