import React from "react";
import "./App.scss";
import { joinClassNames } from "./Classes/Constants";
import { useMediaQuery } from "./Classes/Hooks";
import PageFooter from "./Components/PageElements/PageFooter.jsx";
import Toasts from "./Components/Toasts";
import HomePage from "./Pages/Home";

export default function App() {
	const isMobile = useMediaQuery("max-width", "800px");

	return (
		<div className={joinClassNames("App", isMobile ? "Mobile" : "Desktop")}>
			<div className="Main">
				<HomePage />
			</div>

			<PageFooter />
			<Toasts />
		</div>
	);
}