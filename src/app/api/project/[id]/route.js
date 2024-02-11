import { ObjectId } from "mongodb";
import connectMongoDB from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

// PROJECT
export async function GET(req, { params }) {
	try {
		const { id } = params;
		const client = await connectMongoDB();
		const db = client.db("DestinationDesigns");
		const project = await db
			.collection("Projects")
			.findOne({ _id: new ObjectId(id) });
		return NextResponse.json(project);
	} catch (err) {
		console.log("Error in GET:", err);
		return NextResponse.json({});
	}
}
