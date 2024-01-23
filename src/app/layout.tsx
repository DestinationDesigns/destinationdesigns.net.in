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
				{children}
				<Footer />
			</body>
		</html>
	);
}
