import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) {
    throw new Error("Please add MongoDB URL");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        console.log("✅ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then(() => {
            console.log("🚀 MongoDB Connected Successfully!");
            return mongoose.connection;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("❌ Failed to connect to MongoDB:", error);
        throw new Error("Failed to connect to MongoDB");
    }

    return cached.conn;
}
