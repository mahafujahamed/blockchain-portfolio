import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

// Extend the globalThis type to hold the client promise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}

const clientPromise = globalThis._mongoClientPromise!;

export default clientPromise;
