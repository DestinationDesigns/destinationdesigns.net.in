import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Projects from "./util";
import getBase64 from "@/lib/getbase64";

async function getData() {
	const res = await fetch("http://localhost:3000/api/projects");
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
}

async function ProjectsPage() {
	const data = await getData();
	const base64Promises = data.map((project: any) =>
		getBase64(project.images[0]),
	);
	const base64Result = await Promise.all(base64Promises);
	data.forEach((project: any, index: number) => {
		project.images[1] = base64Result[index];
	});

	return (
		<>
			<Projects data={data} />
			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default ProjectsPage;
