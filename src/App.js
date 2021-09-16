import React from "react";
import { useMediaQuery } from "react-responsive";
import "./App.scss";
import HomePage from "./Pages/Home";
import Toasts from "./Components/Toasts";
import { joinClassNames } from "./Classes/Constants";
import PageFooter from "./Components/PageElements/PageFooter.jsx";

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
				<PageElement />
			</div>

			<PageFooter />
			<Toasts />
		</div>
	);
}