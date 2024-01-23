import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./Header.css";
import main_logo_black from "../../public/assets/main_logo_black.png";
import main_logo_white from "../../public/assets/main_logo_white.png";

function Header({ dark }) {
	return (
		<div className="header">
			<Link href="/">
				<Image src={dark ? main_logo_white : main_logo_black} alt="" />
			</Link>
		</div>
	);
}

export default Header;
