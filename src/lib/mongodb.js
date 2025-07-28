// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) throw new Error("Please define MONGO_URI in .env.local");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
