import Image from "next/image"
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";

import "./Project.css";

async function getData(projectID: string) {
	const res = await fetch(`http://localhost:3000/api/project/${projectID}`)
	return res.json();
}

async function Project({ params }: { params: { id: string } }) {
	const data = await getData(params.id);
	return (
		<>
			<div className="image-grid">
				{data.images.map((imgpath: string, index: number) => (
					<Image key={index} src={imgpath} alt="img" />
				))}
			</div>
			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default Project;
