"use client";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/lib/loader";

import "./Project.css";

function Project({ data }) {
	return (
		<>
			<div className="image-grid-v">
				{data.images.map((img: string, index: number) => (
					<div className="image" key={index}>
						<Image
							loader={Loader}
							src={img}
							fill
							placeholder="blur"
							blurDataURL={data.blur[index]}
							alt="img"
						/>
						{index === 0 && (
							<div className="floating-text">
								<h1>{data.name}</h1>
								<p>{data.description}</p>
							</div>
						)}
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
		</>
	);
}

export default Project;
