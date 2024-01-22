"use client";

export default function myImageLoader({ src, width, quality }) {
	return `https://destinationdesigns.s3.ap-south-1.amazonaws.com/projects/${src.replace(
		/ /g,
		"+",
	)}_${width}.avif`;
}
