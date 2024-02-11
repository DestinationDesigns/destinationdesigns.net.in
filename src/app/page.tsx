import Image from "next/image";
import React from "react";

import getBase64 from "@/lib/getbase64";

import Slider from "@/components/Slider";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

import "./Home.css";

import arch_exp from "../../public/assets/architecture-exp.png";
import intr_exp from "../../public/assets/interior-exp.png";
import plng_exp from "../../public/assets/planning-exp.png";

async function getData() {
	const res = await fetch("http://localhost:3000/api/slides");
	if (!res.ok) throw new Error("Failed to fetch data");
	return res.json();
}

async function Home() {
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
							<h3>ARCHITECTURE</h3>
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
							<h3>INTERIOR DESIGN</h3>
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
							<h3>PLANNING</h3>
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
