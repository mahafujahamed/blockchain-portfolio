import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}
const clientPromise = global._mongoClientPromise;

export async function connectDB() {
  const client = await clientPromise!;
  const db = client.db(process.env.MONGODB_DB); // or null for default DB
  return { client, db };
}
