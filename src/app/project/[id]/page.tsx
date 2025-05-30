import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Project from "./util";
import getBase64 from "@/lib/getbase64";

import dbInstance from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function getData(projectID: string) {
	try {
		const db = await dbInstance();
		const project = await db
			.collection("Projects")
			.findOne(
				{ _id: new ObjectId(projectID) },
				{ projection: { _id: 0 } },
			);
		return project;
	} catch (err) {
		console.error("Failed to fetch data", err);
		return;
	}
}

async function ProjectPage({ params }: { params: { id: string } }) {           
	const data = await getData(params.id);
	if (data) {
		const base64Promises = data.images.map((photo: any) =>
			getBase64(photo),
		);
		data.blur = await Promise.all(base64Promises);
	}
	return (
		<>
			<Project data={data} />
			<Header dark={false} />
			<Navbar dark={false} />
		</>
	);
}

export default ProjectPage;
