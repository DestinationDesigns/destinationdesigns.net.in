import { MongoClient } from "mongodb";

const clusterUrl = encodeURIComponent(process.env.CLUSTER_URL as string);
const username = encodeURIComponent(process.env.USERNAME as string);
const password = encodeURIComponent(process.env.PASSWORD as string);
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;
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
