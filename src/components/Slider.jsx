"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "@/lib/loader";
import "./Slider.css";

function Slider({ data }) {
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
	}, [currentSlide, autoScroll, slideInterval]);

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
						<Link href={`/project/${slide._id}`}>
							<Image
								loader={Loader}
								src={slide.images[0]}
								fill
								placeholder="blur"
								blurDataURL={slide.images[1]}
								alt="slides"
							/>
						</Link>
						<h1>{slide.name}</h1>
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
