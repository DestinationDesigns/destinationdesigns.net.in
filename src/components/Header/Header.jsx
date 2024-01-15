import React from "react";
import Link from "next/link"
import Image from "next/image"
import "./Header.css";

import logo_white from "../../../public/assets/main_logo_white.png";
import logo_black from "../../../public/assets/main_logo_black.png";

function Header({ dark }) {
	return (
		<div className="header">
			<Link href="/">
				<Image src={dark ? logo_black : logo_white} alt="" />
			</Link>
		</div>
	);
}

export default Header;
