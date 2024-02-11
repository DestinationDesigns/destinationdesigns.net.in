interface LoaderProps {
	src: string;
	width: number;
}

function Loader(props: LoaderProps): string {
	const formattedSrc = props.src.replace(/\.[^/.]+$/, "").replace(/ /g, "+");
	return `https://s3.ap-south-1.amazonaws.com/destinationdesigns.net.in/projects/${formattedSrc}_${props.width}.avif`;
}

export default Loader;
