import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>DDPL</title>
			</head>

			<body>
				<div className="container">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
