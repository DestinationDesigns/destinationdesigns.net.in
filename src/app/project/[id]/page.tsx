"use client"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import Header from "../../../components/Header/Header";
import Navbar from "../../../components/Navbar/Navbar";

import "./Project.css";

const imageLoader = ({ src, width, quality }) => {
	return `https://destinationdesigns.s3.ap-south-1.amazonaws.com/projects/${src.replace(/\.[^/.]+$/, "").replace(/ /g, "+",)}_${width}.avif`;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Project({ params }: { params: { id: string } }) {

	const { data, error, isLoading } = useSWR(`/api/project/${params.id}`, fetcher);

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	return (
		<>
			<div>
				{data.images.map((img: string, index: number) => (
					<div className="image" key={index}>
						<Image loader={imageLoader} src={img} fill alt="img" />
						{index === 0 &&
							<div className="floating-text">
								<h1>{data.name}</h1>
								<p>{data.description}</p>
							</div>}

					</div>
				))}
			</div>
			<div className="project-details">
				<div className="detail-section">
					<h3>Location </h3>
					<h3>{data.location}</h3>
				</div>
				<hr />
				<div className="detail-section">
					<h3>Type </h3>
					<h3>{data.type}</h3>
				</div>
				<hr />
				<div className="detail-section">
					<h3>Site Area </h3>
					<h3>{data.area}</h3>
				</div>
				<hr />
				<div className="detail-section">
					<h3>Features </h3>
					<h3>{data.description}</h3>
				</div>
				<hr />
				<div className="detail-section">
					<h3>Status </h3>
					<h3>{data.status}</h3>
				</div>
				<div className="redirect-section">
					<Link href="/projects">BACK TO PROJECTS</Link>
				</div>
			</div>
			<Header dark={false} />
			<Navbar dark={false} />
		</>
	);
}

export default Project;
