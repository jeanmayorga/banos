import mongoose from "mongoose";

export let isConnected = false;
export let connectionCached: typeof mongoose;

export async function connectDatabase() {
  if (isConnected) {
    console.log("database: connection retrieved from cache");
    return connectionCached;
  }

  try {
    const connection = await mongoose.connect(
      "mongodb+srv://root:zDXpW3PMF8qsSBcY@cluster0.0f5uo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        dbName: "production",
      }
    );
    connectionCached = connection;
    isConnected = true;

    console.log("database: connection successfully");
    return connection;
  } catch {
    console.log("database: connection failed");
    return null;
  }
}

export async function closeDatabaseConnection() {
  await mongoose.connection.close();
  console.log("database: connection clossed");
  isConnected = false;
}
