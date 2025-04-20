import mongoose, { Connection } from 'mongoose';

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/smartcity';

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local');
}

export async function db<T>(fn: (conn: Connection) => Promise<T>): Promise<T> {
    // 👇 This creates an independent connection instance
    const connection = await mongoose
        .createConnection(MONGODB_URI, {
            dbName: 'smartcity',
        })
        .asPromise();

    try {
        // 👇 Pass the isolated connection to the caller
        return await fn(connection);
    } catch (error) {
        console.error('Database operation failed:', error);
        throw error;
    } finally {
        // 👇 Close only this connection (does NOT affect other requests)
        await connection.close();
    }
}
