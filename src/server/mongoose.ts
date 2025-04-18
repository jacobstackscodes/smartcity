// lib/db.ts
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

let cachedConnection: mongoose.Connection | null = null;

export async function connectToDB() {
    if (!uri) {
        throw new Error(
            'Please define the MONGODB_URI environment variable inside .env.local',
        );
    }

    if (cachedConnection && mongoose.connection.readyState === 1) {
        return cachedConnection;
    }

    try {
        await mongoose.connect(uri);
        cachedConnection = mongoose.connection;
        console.log('Connected to MongoDB');
        return cachedConnection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}
