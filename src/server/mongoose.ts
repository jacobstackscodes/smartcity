import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'smartcity';

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDatabase() {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        await mongoose.connect(uri, { dbName });
        cachedConnection = mongoose.connection;
        console.log('Connected to MongoDB');
        return cachedConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
