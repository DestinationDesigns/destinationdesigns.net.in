import { MongoClient } from "mongodb";

const clusterUrl = process.env.CLUSTER_URL as string;
const clientPEMFile = encodeURIComponent(process.env.PEMFILE_PATH as string);
const authMechanism = "MONGODB-X509";
const uri = `mongodb+srv://${clusterUrl}/?authMechanism=${authMechanism}&tls=true&tlsCertificateKeyFile=${clientPEMFile}`;
const client = new MongoClient(uri);

let isConnected = false;
const connectMongoDB = async () => {
  try {
    if (isConnected) {
      console.log("MongoDB Connection already established.");
    } else {
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB.");
    }
    return client;
  } catch (error) {
    isConnected = false;
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectMongoDB;
