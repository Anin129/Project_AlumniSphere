import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  // Intentionally do not throw to allow build; routes will error if called.
  console.warn("MONGODB_URI is not set. API routes will fail until it's configured.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(dbName = process.env.MONGODB_DB || "alumnisphere"): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
} 