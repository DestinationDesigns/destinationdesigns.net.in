"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./Navbar.css";

import menuopen_logo_black from "../../public/assets/menuopen_logo_black.png";
import menuopen_logo_white from "../../public/assets/menuopen_logo_white.png";
import menuclose_logo from "../../public/assets/menuclose_logo.png";

function Navbar({ dark }) {
	const logoOpen = dark ? menuopen_logo_black : menuopen_logo_white;
	const [isNavbarVisible, setIsNavbarVisible] = useState(false);

	const toggleNavbar = () => {
		setIsNavbarVisible(!isNavbarVisible);
	};

	const navbarClass = isNavbarVisible ? "navbar fade-in" : "navbar fade-out";

	return (
		<div className="navbar-container">
			<nav className={navbarClass}>
				<ul className="navbar-list">
					<li className="navbar-item">
						<Link href="/" onClick={toggleNavbar}>
							ABOUT
						</Link>
					</li>
					<li className="navbar-item">
						<Link href="/projects" onClick={toggleNavbar}>
							PROJECTS
						</Link>
					</li>
					<li className="navbar-item">
						<Link href="/careers" onClick={toggleNavbar}>
							CAREERS
						</Link>
					</li>
					<li className="navbar-item">
						<Link href="/contact" onClick={toggleNavbar}>
							CONTACT
						</Link>
					</li>
					<br />
				</ul>
			</nav>
			<button className="toggle-button" onClick={toggleNavbar}>
				<Image
					className="logo"
					src={isNavbarVisible ? menuclose_logo : logoOpen}
					alt="Logo"
				/>
			</button>
		</div>
	);
}

export default Navbar;
