"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import "./Slider.css";

import img1 from "../../public/assets/slides/AQUA.jpg";
import img2 from "../../public/assets/slides/CASAGRAND MERIDIAN.jpg";
import img3 from "../../public/assets/slides/CASAGRAND ORLENA.jpg";
import img4 from "../../public/assets/slides/NAVACHETANA HOSPITAL.jpg";
import img5 from "../../public/assets/slides/SPECTRUM.jpg";

const data = [
	{ src: img3, title: "CASAGRAND ORLENA" },
	{ src: img2, title: "CASAGRAND MERIDIAN" },
	{ src: img1, title: "AQUA" },
	{ src: img4, title: "NAVACHETANA HOSPITAL" },
	{ src: img5, title: "SPECTRUM" },
];
function Slider() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideLength = data.length;

	const autoScroll = true;
	let slideInterval;
	let intervalTime = 5000;

	const nextSlide = () => {
		setCurrentSlide(
			currentSlide === slideLength - 1 ? 0 : currentSlide + 1,
		);
	};

	const prevSlide = () => {
		setCurrentSlide(
			currentSlide === 0 ? slideLength - 1 : currentSlide - 1,
		);
	};

	function auto() {
		slideInterval = setInterval(nextSlide, intervalTime);
	}

	useEffect(() => {
		setCurrentSlide(0);
	}, []);

	useEffect(() => {
		if (autoScroll) {
			auto();
		}
		return () => clearInterval(slideInterval);
	}, [currentSlide]);

	return (
		<div className="slider">
			{data.map((slide, index) => {
				return (
					<div
						className={
							index === currentSlide ? "slide current" : "slide"
						}
						key={index}
					>
						<div>
							<Image
								src={slide.src}
								alt="slide"
								className="image"
							/>
							<h1>{slide.title}</h1>
						</div>
					</div>
				);
			})}

			<div className="scroll-indicator">
				{data.map((_, index) => (
					<span
						key={index}
						className={
							index === currentSlide ? "dot active" : "dot"
						}
						onClick={() => setCurrentSlide(index)}
					></span>
				))}
			</div>

			<button className="arrow prev" onClick={prevSlide} />
			<button className="arrow next" onClick={nextSlide} />
		</div>
	);
}

export default Slider;
