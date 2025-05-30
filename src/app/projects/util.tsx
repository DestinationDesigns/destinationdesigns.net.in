"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/lib/loader";
import "./Projects.css";

function MenuItem({ label, onClick, isSelected }) {
	return (
		<h3 className={isSelected ? "selected" : ""} onClick={onClick}>
			{label}
		</h3>
	);
}

function Menu({ items, onSelect, className }) {
	return (
		<div className={className}>
			{items.map((item) => (
				<MenuItem
					key={item.key}
					label={item.label}
					onClick={() => onSelect(item.key)}
					isSelected={item.isSelected}
				/>
			))}
		</div>
	);
}

function ImgContainer({ photo }) {
	return (
		<div className="image-container-grid">
			<Link href={`/project/${photo._id}`}>
				<Image
					loader={Loader}
					src={photo.images[0]}
					alt={photo.name}
					sizes="640px"
					placeholder="blur"
					blurDataURL={photo.images[1]}
					fill
				/>
			</Link>
		</div>
	);
}

function Projects({ data }) {
	console.log('Received data:', data); // Check if we're getting data
	const [selectedClass, setSelectedClass] = useState("Featured");
	const [selectedType, setSelectedType] = useState("All");

	const classItems = [
		{
			key: "Featured",
			label: "Featured",
			isSelected: selectedClass === "Featured",
		},
		{
			key: "Architecture",
			label: "Architecture",
			isSelected: selectedClass === "Architecture",
		},
		{
			key: "Interior",
			label: "Interior",
			isSelected: selectedClass === "Interior",
		},
		{
			key: "Master Planning",
			label: "Master Planning",
			isSelected: selectedClass === "Master Planning",
		},
	];

	const typeItems = [
		{ key: "All", label: "All", isSelected: selectedType === "All" },
		{
			key: "Commercial",
			label: "Commercial",
			isSelected: selectedType === "Commercial",
		},
		{
			key: "Residential",
			label: "Residential",
			isSelected: selectedType === "Residential",
		},
	];

	const handleClassChange = (classKey) => {
		setSelectedClass(classKey);
		setSelectedType("All");
	};

	const handleTypeChange = (typeKey) => {
		setSelectedType(typeKey);
	};
	const filteredData = data.filter((photo) => {
		console.log('Processing photo:', photo); // Check each photo being processed
		if (selectedClass === "Featured") {
			return true; // Show all images when Featured is selected
		}
		const classFilter = photo.class === selectedClass;
		const typeFilter =
			selectedType === "All" || photo.group === selectedType;
		return classFilter && typeFilter;
	}).slice(0, selectedClass === "Featured" ? 9 : undefined); // Limit to 9 images only for Featured

	console.log('Filtered data:', filteredData); // Check the final filtered data

	return (
		<>
			<div className="selector-section">
				<h1>Projects</h1>
				<div className="menu-selector">
					<Menu
						className="selector class"
						items={classItems}
						onSelect={handleClassChange}
					/>
					<Menu
						className="selector type"
						items={typeItems}
						onSelect={handleTypeChange}
					/>
				</div>
			</div>

			<div className="image-grid">
				{filteredData.map((photo) => (
					<ImgContainer key={photo._id} photo={photo} />
				))}
			</div>
		</>
	);
}

export default Projects;
