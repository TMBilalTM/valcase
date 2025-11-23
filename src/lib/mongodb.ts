import { MongoClient, type Document } from "mongodb";

const uri = process.env.MONGODB_URI;

const globalForMongo = globalThis as unknown as {
  _mongoClient?: MongoClient;
  _mongoPromise?: Promise<MongoClient>;
};

export async function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  if (globalForMongo._mongoClient) {
    return globalForMongo._mongoClient;
  }

  if (!globalForMongo._mongoPromise) {
    const client = new MongoClient(uri);
    globalForMongo._mongoPromise = client.connect().then((connected) => {
      globalForMongo._mongoClient = connected;
      return connected;
    });
  }

  return globalForMongo._mongoPromise;
}

export async function getCollection<T extends Document>(name: string) {
  const client = await getMongoClient();
  return client.db("valcase").collection<T>(name);
}
