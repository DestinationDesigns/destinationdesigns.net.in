import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

// SLIDES

export async function GET() {
	try {
		const client = await connectMongoDB();
		const db = client.db("DestinationDesigns");
		const projects = await db
			.collection("Projects")
			.find({ slides: { $exists: true } })
			.sort({
				slides: 1,
				_id: 1,
			})
			.project({
				name: 1,
				vindex: 1,
				slides: 1,
				images: { $slice: 1 },
			})
			.toArray();
		return NextResponse.json(projects);
	} catch (err) {
		console.log("Error in GET:", err);
		return NextResponse.json({});
	}
}
