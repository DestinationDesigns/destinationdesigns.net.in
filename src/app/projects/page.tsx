import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Projects from "./util";

import getBase64 from "@/lib/getbase64";
import dbInstance from "@/lib/mongodb";

async function getData() {
	try {
		const db = await dbInstance();
		const projects = await db
			.collection("Projects")
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
				images: { $slice: 1 },
			})
			.toArray();
		console.log('MongoDB projects:', projects);
		projects.forEach((project) => {
			project._id = project._id.toString();
		});
		return projects;
	} catch (err) {
		console.error("Failed to fetch data", err);
		return;
	}
}

async function ProjectsPage() {
	const data = await getData();
	console.log('ProjectsPage data:', data);
	if (data) {
		const base64Promises = data.map((project: any) =>
			getBase64(project.images[0]),
		);
		const base64Result = await Promise.all(base64Promises);
		data.forEach((project: any, index: number) => {
			project.images[1] = base64Result[index];
		});
		console.log('Processed data:', data);
	}

	return (
		<>
			<Projects data={data} />
			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default ProjectsPage;
