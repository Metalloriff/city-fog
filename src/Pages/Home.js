import React from "react";
import "./Home.scss";
import Skyline01 from "../Assets/BG/CitySkyline01.svg";
import Skyline02 from "../Assets/BG/CitySkyline02.svg";
import Rainbow from "../Assets/Rainbow.svg";
import Vroom from "../Assets/Vroom.svg";
import Icon from "../Assets/Icon.svg";
import { useEventListener } from "../Classes/Hooks";
import PaletteBlock from "../Components/PaletteBlock";
import LinkWrapper from "../Components/LinkWrapper";
import Toasts from "../Components/Toasts";
import { Clipboard, Code, Edit, ExternalLink, GitHub } from "react-feather";

/**
 * Copies the specified text to the clipboard
 * @param text The text to copy.
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
	try {
		await window.navigator.clipboard.writeText(text);

		Toasts.showToast(<span><b>{text.length >= 100 ? text.substr(0, 100) + "..." : text}</b> copied to clipboard</span>, "Success");
	}
	catch (e) {
		Toasts.showToast("Failed to copy - your browser does not support copying to clipboard!", "Failure", 10);
	}
}

/**
 * Because it looks better to code.
 * @param _ The URL to convert.
 * @returns {string} url("{_}")
 */
function url(_) {
	return `url("${_}")`;
}

export default function HomePage() {
	const skyline01 = React.useRef();
	const skyline02 = React.useRef();

	useEventListener("scroll", () => {
		const value = window.scrollY;
		const targetValue = 2000;

		skyline01.current.style.backgroundPositionX = `-${((value / targetValue) * 100) + 20}%`;
		skyline02.current.style.backgroundPositionX = `${(value / targetValue) * 100}%`;
	}, { target: window, init: true });

	return (
		<div className="MainPage">
			<div className="Background">
				<div className="Skyline" style={{ backgroundImage: url(Skyline01) }} ref={skyline01} />
				<div className="Skyline" style={{ backgroundImage: url(Skyline02) }} ref={skyline02} />
			</div>

			<div className="Background">
				<div className="Rainbow" style={{ backgroundImage: url(Rainbow) }} />
			</div>

			<div className="Background">
				<div className="Vroom" style={{ backgroundImage: url(Vroom) }} />
			</div>

			<div className="Head">
				<img className="Icon" src={Icon} alt="Icon" />
				<div className="Header">
					<div className="MainHeader">City Fog</div>
					<div className="Desc">
						A cyberpunk-esque color palette/theme, designed to give a cold but lively feel.
					</div>
				</div>
			</div>

			<div className="Sections">
				<div className="Section BackgroundColors">
					<div className="PaletteBlock">
						<div className="Title">Want to use City Fog in your project?</div>
						<div className="Description">
							{`City Fog is free to use for any of your projects,
							  all I ask is that you provide a link somewhere on your page (ex: footer)
							  giving credit to the palette/theme.`}
						</div>

						<div className="Blocks">
							<div className="Block">
								<LinkWrapper href="https://github.com/Metalloriff/city-fog">
									<div className="ColorContainer">
										<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)" }}>
											<div className="Color" style={{ fontSize: "3em" }}><GitHub /></div>
											<div className="Hover"><ExternalLink /></div>
										</div>
									</div>
									<div className="Hex">GitHub</div>
								</LinkWrapper>
							</div>
							<div className="Block">
								<LinkWrapper href="https://raw.githubusercontent.com/Metalloriff/city-fog/main/city-fog-theme.css">
									<div className="ColorContainer">
										<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)" }}>
											<div className="Color" style={{ fontSize: "3em" }}><Code /></div>
											<div className="Hover"><ExternalLink /></div>
										</div>
									</div>
									<div className="Hex">CSS Vars</div>
								</LinkWrapper>
							</div>
							<div className="Block" onClick={() => copyToClipboard("https://metalloriff.github.io/city-fog")}>
								<div className="ColorContainer">
									<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)" }}>
										<div className="Color" style={{ fontSize: "2.5em" }}><Edit /></div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Credit</div>
							</div>
						</div>
					</div>

					<PaletteBlock
						title="Background Colors"
						description={`These are used for page and item backgrounds.
						These should also generally be used to reflect depth;
						for example, list items on a page should be a brighter bg color, not darker.`}
					>
						Primary:#2c3946
						Secondary:#364758
						Tertiary:#42566a
					</PaletteBlock>

					<PaletteBlock
						title="Accent Colors"
						description={`These are used for contrasting important elements and text.`}
					>
						Primary:#7bb1bd
						Secondary:#BD7BA2
					</PaletteBlock>

					<PaletteBlock
						title="Rainbow Accent Colors"
						description={`These serve different purposes based on the context;
						for example, red could be used to signify danger, green to signify success, etc.`}
					>
						Red:#be7d7d
						Orange:#bd987e
						Yellow:#c5c387
						Green:#7bbe92
						Blue:#7cb2bd
						Purple:#9a88bf
						Pink:#be7aa1
					</PaletteBlock>

					<PaletteBlock
						title="Hover Modifiers"
						description={`These modifiers should be used for clarity,
						displaying when a user is hovering over an interact-able item or button.`}
						width={300}
						shadows={false}
					>
						Primary:rgba(255,255,255,0.09)
						Secondary:rgba(255,255,255,0.18)
						Tertiary:rgba(255,255,255,0.075)
					</PaletteBlock>

					<PaletteBlock
						title="Text Colors"
						description={`The base color should be used as the base text color.
						Plain white can be used to add more focus to a specific block of text,
						but will stand out and look mis-placed.`}
						textColor="black"
					>
						Base:#c3ccd4
						Bold:white
					</PaletteBlock>

					<div className="PaletteBlock">
						<div className="Title">Border Radii</div>
						<div className="Description">
							{`Borders should be slightly smoothed, giving a soft and flat feel.
							  Smaller items (ex: buttons) should use the primary border radius.
							  Larger items (ex: modals, popouts) should use the secondary border radius.`}
						</div>

						<div className="Blocks">
							<div className="Block">
								<div className="ColorContainer" onClick={() => copyToClipboard("4px")}>
									<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)", borderRadius: 4 }}>
										<div className="Color">4px</div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Primary</div>
							</div>
							<div className="Block" onClick={() => copyToClipboard("7px")}>
								<div className="ColorContainer">
									<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)", borderRadius: 7 }}>
										<div className="Color">7px</div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Secondary</div>
							</div>
						</div>
					</div>

					<div className="PaletteBlock">
						<div className="Title">Shadows</div>
						<div className="Description">
							{`Shadows are optional, and generally used to clarify separation without contrast.`}
						</div>

						<div className="Blocks">
							<div className="Block">
								<div className="ColorContainer" onClick={() => copyToClipboard("0 0 7px rgba(0, 0, 0, 0.2)")}
									style={{ width: 300, margin: 20 }}>
									<div className="Color Alt" style={{
										backgroundColor: "var(--tertiary-bg)",
										boxShadow: "0 0 7px rgba(0, 0, 0, 0.2)"
									}}>
										<div className="Color">0 0 7px rgba(0, 0, 0, 0.2)</div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Primary</div>
							</div>

							<div className="Block">
								<div className="ColorContainer" onClick={() => copyToClipboard("0 0 12px rgba(0, 0, 0, 0.35)")}
									style={{ width: 300, margin: 20 }}>
									<div className="Color Alt" style={{
										backgroundColor: "var(--tertiary-bg)",
										boxShadow: "0 0 12px rgba(0, 0, 0, 0.35)"
									}}>
										<div className="Color">0 0 12px rgba(0, 0, 0, 0.35)</div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Secondary</div>
							</div>

							<div className="Block">
								<div className="ColorContainer" onClick={() => copyToClipboard("0 0 15px rgba(0, 0, 0, 0.5)")}
									style={{ width: 300, margin: 20 }}>
									<div className="Color Alt" style={{
										backgroundColor: "var(--tertiary-bg)",
										boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)"
									}}>
										<div className="Color">0 0 15px rgba(0, 0, 0, 0.5)</div>
										<div className="Hover"><Clipboard /></div>
									</div>
								</div>
								<div className="Hex">Tertiary</div>
							</div>
						</div>

						<div className="PaletteBlock">
							<div className="Title">Font Families</div>
							<div className="Description">
								{`Any font will do, but these are the fonts used on this site.
								  Primary should be used as the base, which mostly everything will use.
								  Secondary should be used on descriptions and the like; to give a softer feel.`}
							</div>

							<div className="Blocks">
								<div className="Block">
									<div className="ColorContainer" onClick={() => copyToClipboard("Verdana, sans-serif")}
										style={{ width: 300 }}>
										<div className="Color Alt" style={{
											backgroundColor: "var(--tertiary-bg)",
											fontFamily: "Verdana, sans-serif",
											textTransform: "unset"
										}}>
											<div className="Color" style={{ textTransform: "unset" }}>The feeling sets in; but only after dark.</div>
											<div className="Hover"><Clipboard /></div>
										</div>
									</div>
									<div className="Hex">Primary - Verdana</div>
								</div>
								<div className="Block">
									<div className="ColorContainer" onClick={() => copyToClipboard("monospace")}
										style={{ width: 300 }}>
										<div className="Color Alt" style={{
											backgroundColor: "var(--tertiary-bg)",
											fontFamily: "monospace",
											textTransform: "unset"
										}}>
											<div className="Color" style={{ textTransform: "unset" }}>The feeling sets in; but only after dark.</div>
											<div className="Hover"><Clipboard /></div>
										</div>
									</div>
									<div className="Hex">Secondary - monospace</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}