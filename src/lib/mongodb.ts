import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
