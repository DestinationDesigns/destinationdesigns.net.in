import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Footer.css";

import main_logo_white from "../../public/assets/main_logo_white.png";
import instagram_logo from "../../public/assets/instagram_logo.png";
import linkedin_logo from "../../public/assets/linkedin_logo.png";

function Footer() {
	return (
		<footer>
			<div className="footer-container">
				<div className="footer-section">
					<Link href="/">
						<Image
							src={main_logo_white}
							fill
							alt="Main Logo"
							className="mainlogo"
						/>
					</Link>
				</div>
				<div className="footer-section">
					<h3 className="section-header">
						<hr className="section-hr" /> CONNECT US
					</h3>
					<p>DESTINATIONDESIGNS.NET.IN</p>
					<p>INFO@DESTINATIONDESIGNS.NET.IN</p>
				</div>
				<div className="footer-section">
					<h3 className="section-header">
						<hr className="section-hr" /> STUDIO
					</h3>
					<ul>
						<li>
							<Link href="/projects">PROJECTS</Link>
						</li>
						<li>
							<Link href="/">EXPERTISE</Link>
						</li>
						<li>
							<Link href="/careers">CAREERS</Link>
						</li>
						<li>
							<Link href="/contact">CONTACT</Link>
						</li>
					</ul>
				</div>
				<div className="footer-section">
					<h3 className="section-header">
						<hr className="section-hr" /> VISIT
					</h3>
					<p>#27, Gurupriya Anushka,</p>
					<p>Ground Floor, 5th Cross,</p>
					<p>3rd Main, B T M 2nd Stage,</p>
					<p>N S Palaya, Dollar Colony,</p>
					<p>Bangalore, karnataka</p>
					<p>560076</p>
				</div>
			</div>

			<div className="footer-container">
				<p className="cc">&copy;2023 DESTINATIONDESIGNS.NET.IN</p>
				<div className="social-logos">
					<a
						href="https://www.instagram.com/dojacat"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={instagram_logo}
							alt="Instagram Logo"
							className="social-logo"
						/>
					</a>
					<a
						href="https://www.linkedin.com/company/destination-designs-bangalore"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src={linkedin_logo}
							alt="LinkedIn Logo"
							className="social-logo"
						/>
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
