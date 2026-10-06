import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/visitor_management_system';

  try {
    console.log(`[Database] Attempting connection to MongoDB at: ${uri}`);
    
    // Connect with a short timeout so if local mongo is not running, we don't hang
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });

    isConnected = true;
    console.log(`\x1b[32m✔ [MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}\x1b[0m`);
    return { connected: true, host: conn.connection.host };
  } catch (error) {
    isConnected = false;
    console.warn(`\x1b[33m⚠ [MongoDB Connection Warning]: ${error.message}\x1b[0m`);
    console.warn(`\x1b[36mℹ [Fallback Mode]: Running with local JSON persistence in server/data/visitors.json so you can test CRUD features immediately without setting up MongoDB!\x1b[0m`);
    console.warn(`\x1b[36mℹ To use real MongoDB or MongoDB Atlas, configure MONGODB_URI in server/.env\x1b[0m`);
    return { connected: false, error: error.message };
  }
};

export const getDBStatus = () => isConnected;
