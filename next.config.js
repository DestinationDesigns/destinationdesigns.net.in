/** @type {import('next').NextConfig} */
const nextConfig = {
	trailingSlash: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname:
					"s3.ap-south-1.amazonaws.com/destinationdesigns.net.in",
				port: "",
				pathname: "/projects/**",
			},
		],
	},
};

module.exports = nextConfig;
