"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"
import useSWR from "swr";

import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./Projects.css";

const imageLoader = ({ src, width, quality }) => {
	return `https://destinationdesigns.s3.ap-south-1.amazonaws.com/projects/${src.replace(/\.[^/.]+$/, "").replace(/ /g, "+",)}_640.avif`;
}

function ImgContainer({ photo }) {
	return (
		<div className="image-container-grid">
			<Link href={`/project/${photo._id}`} >
				<Image loader={imageLoader} src={photo.images[0]} alt={photo.name} fill />
			</Link>
		</div >
	);
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Projects() {
	const { data, error, isLoading } = useSWR("/api/projects", fetcher);
	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	// const [selectedClass, setSelectedClass] = useState("Featured"); // arch, int etc..
	// const [selectedType, setSelectedType] = useState("All"); // res/comm
	//
	// const handleClassChange = (classKey: any) => {
	// 	setSelectedClass(classKey);
	// 	setSelectedType("All");
	// };
	//
	// const handleTypeChange = (typeKey: any) => {
	// 	setSelectedType(typeKey);
	// };

	console.log(data);
	return (
		<>
			<div className="selector-section">
				<h1>Projects</h1>
				<div className="menu-selector">
					<div className="selector class">
						<h3>Featured</h3>
						<h3>Architecture</h3>
						<h3>Interior Design</h3>
						<h3>Master Planning</h3>
					</div>
					<div className="selector type">
						<h3>All</h3>
						<h3>Commercial</h3>
						<h3>Residential</h3>
					</div>

				</div>
			</div>

			<div className="image-grid">
				{data.map(photo => (<ImgContainer key={photo._id} photo={photo} />))}
			</div>

			<Header dark={true} />
			<Navbar dark={true} />
		</>
	);
}

export default Projects;
