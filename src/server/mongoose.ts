import mongoose from 'mongoose';

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcity';

let isConnected = false;

export async function db<T>(fn: () => Promise<T>): Promise<T> {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env.local');
        }

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(MONGODB_URI, {
                dbName: 'smartcity',
            });
            isConnected = true;
        }

        return await fn();
    } catch (error) {
        console.error('Database operation failed:', error);
        throw error;
    } finally {
        if (mongoose.connection.readyState !== 0 && isConnected) {
            await mongoose.connection.close();
            isConnected = false;
        }
    }
}
