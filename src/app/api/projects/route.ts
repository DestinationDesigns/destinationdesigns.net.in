import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

// PROJECTS

export async function GET() {
	try {
		const client = await connectMongoDB();
		const db = client.db("DestinationDesigns");
		const projects = await db
			.collection("Project")
			.find({})
			.sort({
				vindex: 1,
				_id: 1,
			})
			.project({
				name: 1,
				class: 1,
				group: 1,
				featured: 1,
				vindex: 1,
			})
			.toArray();
		return NextResponse.json(projects);
	} catch (err) {
		console.log("Error in GET:", err);
		return NextResponse.json({});
	}
}
