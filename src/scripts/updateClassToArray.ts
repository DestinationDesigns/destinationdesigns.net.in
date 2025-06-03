import { MongoClient, ObjectId } from "mongodb";

const clusterUrl = encodeURIComponent(process.env.CLUSTER_URL as string);
const username = encodeURIComponent(process.env.USERNAME as string);
const password = encodeURIComponent(process.env.PASSWORD as string);
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;

async function updateClassToArray() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("DestinationDesigns");
        const collection = db.collection("Projects");

        // Find all documents
        const documents = await collection.find({}).toArray();
        console.log(`Found ${documents.length} documents to update`);

        // Update each document
        for (const doc of documents) {
            const currentClass = doc.class;
            
            // Skip if class is already an array
            if (Array.isArray(currentClass)) {
                console.log(`Document ${doc._id} already has class as array:`, currentClass);
                continue;
            }

            // Convert to array
            const newClass = currentClass ? [currentClass] : [];
            
            // Update the document
            await collection.updateOne(
                { _id: doc._id },
                { $set: { class: newClass } }
            );
            
            console.log(`Updated document ${doc._id}: ${currentClass} -> ${JSON.stringify(newClass)}`);
        }

        console.log("Update completed successfully");
    } catch (error) {
        console.error("Error updating documents:", error);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

// Run the update
updateClassToArray().catch(console.error); 