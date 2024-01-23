import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Project from "./util";
import getBase64 from "@/lib/getbase64";

async function getData(projectID: string) {
	const res = await fetch(`http://localhost:3000/api/project/${projectID}`);
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
}

async function ProjectPage({ params }: { params: { id: string } }) {
	const data = await getData(params.id);
	const base64Promises = data.images.map((photo) => getBase64(photo));
	data.blur = await Promise.all(base64Promises);
	return (
		<>
			<Project data={data} />
			<Header dark={false} />
			<Navbar dark={false} />
		</>
	);
}

export default ProjectPage;
