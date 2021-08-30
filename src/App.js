import React from "react";
import { useMediaQuery } from "react-responsive";
import "./App.scss";
import HomePage from "./Pages/Home";
import Toasts from "./Components/Toasts";
import { joinClassNames } from "./Classes/Constants";

export default function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
	
	let PageElement;
	
	switch (window.location.hash.split(/#\/?/)[1]) {
		default:
			PageElement = HomePage;
			break;
			
		case "sub_page":
			break;
	}

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className="Main">
				<PageElement/>
			</div>

			<footer className="Footer">
				<div><a href="https://fontawesome.com/license">Icons</a></div>
				<div className="Divider"/>
				<div>Copyright © 2021-{new Date().getFullYear()} Metalloriff</div>
			</footer>

			<Toasts/>
		</div>
	);
}