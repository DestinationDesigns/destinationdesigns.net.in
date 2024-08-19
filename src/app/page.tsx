import Image from "next/image";
import React from "react";

import getBase64 from "@/lib/getbase64";
import dbInstance from "@/lib/mongodb";

//import Slider from "@/components/Slider";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import "./Home.css";

import arch_exp from "../../public/assets/architecture-exp.png";
import intr_exp from "../../public/assets/interior-exp.png";
import plng_exp from "../../public/assets/planning-exp.png";

async function getData() {
	try {
		const db = await dbInstance();
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
		projects.forEach((project) => {
			project._id = project._id.toString();
		});
		return projects;
	} catch (err) {
		console.error("Failed to fetch data", err);
		return;
	}
}

async function Home() {
	const data = await getData();
	if (data) {
		const base64Promises = data.map((project: any) =>
			getBase64(project.images[0]),
		);
		const base64Result = await Promise.all(base64Promises);
		data.forEach((project: any, index: number) => {
			project.images[1] = base64Result[index];
		});
	}
	return (
		<>
			<Slider data={data} />
			<div className="home-container">
				<span className="caption">
					At Destination, we believe quality is never an accident.
					<br />
					It is always the result of high intentions, sincere efforts
					and
					<br />
					skillful execution in search of Excellence...
				</span>
				<div className="expertise-title">
					<h2>Expertise</h2>
				</div>
				<div className="expertise-container">
					<div className="expertise-img-container">
						<Image
							src={arch_exp}
							alt=""
							className="expertise-img"
						/>
						<div className="expertise-overlay">
							<h3>
								ARCHITECTURE
								<br />+
							</h3>
							<p className="overlay-desc">
								We are passionate about responsible design and
								the impact it has on the lives we touch every
								day.
							</p>
						</div>
					</div>
					<div className="expertise-img-container">
						<Image
							src={intr_exp}
							alt=""
							className="expertise-img"
						/>
						<div className="expertise-overlay">
							<h3>
								INTERIOR DESIGN
								<br />+
							</h3>
							<p className="overlay-desc">
								We create functional interior design solutions
								which address the needs & requirements of our
								client.
							</p>
						</div>
					</div>
					<div className="expertise-img-container">
						<Image
							src={plng_exp}
							alt=""
							className="expertise-img"
						/>
						<div className="expertise-overlay">
							<h3>
								PLANNING
								<br />+
							</h3>
							<p className="overlay-desc">
								We are committed to delivering environmental and
								socially sustainable communities with a strong
								sense of design value on an urban level.
							</p>
						</div>
					</div>
				</div>
			</div>
			<Header dark={false} />
			<Navbar dark={false} />
		</>
	);
}

export default Home;
