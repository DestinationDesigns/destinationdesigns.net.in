import connectMongoDB from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await connectMongoDB();
    const db = client.db("DestinationDesigns");
    const projects = await db.collection("Projects").find({}).toArray();
    console.log(projects);
    return NextResponse.json({ projects });
  } catch (err) {
    console.log("Error in GET:", err);
  }
}
