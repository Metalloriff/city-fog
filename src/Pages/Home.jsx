import React from "react";
import { Clipboard, Code, Edit, ExternalLink, GitHub } from "react-feather";
import Skyline01 from "../Assets/BG/CitySkyline01.svg";
import Skyline02 from "../Assets/BG/CitySkyline02.svg";
import { ReactComponent as FlyingVroom } from "../Assets/FlyingCar.svg";
import Icon from "../Assets/Logo.png";
import Rainbow from "../Assets/Rainbow.svg";
import Vroom from "../Assets/Vroom.svg";
import { useEventListener } from "../Classes/Hooks";
import LinkWrapper from "../Components/LinkWrapper";
import PaletteBlock from "../Components/PaletteBlock";
import Toasts from "../Components/Toasts";
import "./Home.scss";

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

function randomRange(min, max) {
	return Math.floor(
		Math.random() * (
			max - min + 1
		) + min
	);
}

const colors = [
	"var(--blue)",
	"var(--pink)",
];

function StarField({ index }) {
	const [offset, setOffset] = React.useState(0);

	const size = React.useMemo(() => randomRange(1, 2) + (index / 2), []);
	const field = React.useMemo(() => {
		const field = [];

		for (let i = 0; i < randomRange((window.innerWidth / 1920) * 100, (window.innerWidth / 1920) * 150); i++) {
			field.push(
				`${randomRange(0, 100)}vw ${randomRange(0, 200)}vh 0 ${randomRange(0, 3)}px ${colors[randomRange(0, colors.length - 1)]}`
			);
		}

		return field.join();
	}, []);

	useEventListener("scroll", () => {
		setOffset(-window.scrollY * 2);
	});

	return (
		<div
			className="StarField"
			style={{
				width: size,
				height: size * 50,
				boxShadow: field,
				transform: `translateY(${(offset / (window.outerHeight / 5)) * (index * 1.3)}vh)`,
				opacity: Math.max(0.5, index / 4)
			}}
		/>
	);
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

			<StarField index={1} />
			<StarField index={2} />
			<StarField index={3} />
			<StarField index={4} />

			<div className="FlyingCars">
				{[1, 2, 3, 4, 5, 6].map(i => (
					<FlyingVroom
						className="FlyingCar"
						key={i}

						style={{
							animationDuration: `${2 + (i * 0.5)}s`,
						}}
					/>
				))}
			</div>

			<div className="Background">
				<div className="Rainbow" style={{ backgroundImage: url(Rainbow) }} />
			</div>

			<div className="Background">
				<div className="Vroom" style={{ backgroundImage: url(Vroom) }} />
			</div>

			<div className="Head FlexCenter">
				<img className="Icon" src={Icon} alt="Icon" />
				<div className="Header">
					<div className="MainHeader">City Fog</div>
					<div className="Desc">
						A cyberpunk-esque color palette/theme,<br />
						designed to give a cold but lively feel.
					</div>
				</div>
			</div>

			<div className="Sections">
				<div className="Section PaletteBlocks">
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
						description={`For page and item backgrounds.`}
					>
						一:#2c3946
						二:#364758
						三:#42566a
						四:#324151
						五:#232e38
					</PaletteBlock>

					<PaletteBlock
						title="Accent Colors"
						description={`For contrasting important elements and text.`}
					>
						一:#7bb1bd
						二:#BD7BA2
					</PaletteBlock>

					<PaletteBlock
						title="Rainbow Accent Colors"
						description={`These serve different purposes based on the context;
						for example, red could be used to signify danger, green to signify success, etc.`}
					>
						赤:#be7d7d
						橙:#bd987e
						黄:#c5c387
						緑:#7bbe92
						青:#7cb2bd
						紫:#9a88bf
						桃:#be7aa1
					</PaletteBlock>

					<PaletteBlock
						title="Hover Modifiers"
						description={`These modifiers should be used for clarity,
						displaying when a user is hovering over an interact-able item or button.
						Alternatively, use an accent color.`}
						width={300}
						shadows={false}
					>
						一:rgba(255,255,255,0.09)
						二:rgba(255,255,255,0.18)
						三:rgba(255,255,255,0.075)
					</PaletteBlock>

					<PaletteBlock
						title="Text Colors"
						description={`Never use plain white against a dark background.
						It brings sorrow to the eyes.`}
						textColor="black"
					>
						一:#c3ccd4
						二:#ffffff
						三:#d8e1e9
					</PaletteBlock>

					<PaletteBlock
						title="Border Radii"
						description={`Feel free to use any border radius you like;
							but city fog comes with a few presets, for those who wish to use them.
							Smaller items (ex: buttons) should use the primary border radius.
							Larger items (ex: modals, popouts) should use the secondary/tertiary border radius.`}
						custom
					>
						<div className="Block">
							<div className="ColorContainer" onClick={() => copyToClipboard("4px")}>
								<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)", borderRadius: 4 }}>
									<div className="Color">4px</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">一</div>
						</div>
						<div className="Block" onClick={() => copyToClipboard("7px")}>
							<div className="ColorContainer">
								<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)", borderRadius: 7 }}>
									<div className="Color">7px</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">二</div>
						</div>
						<div className="Block" onClick={() => copyToClipboard("7px")}>
							<div className="ColorContainer">
								<div className="Color Alt" style={{ backgroundColor: "var(--primary-color)", borderRadius: 15 }}>
									<div className="Color">15px</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">三</div>
						</div>
					</PaletteBlock>

					<PaletteBlock
						title="Shadows"
						description={`Shadows are optional, and generally used to clarify separation without contrast.`}
						custom
					>
						<div className="Block">
							<div className="ColorContainer" onClick={() => copyToClipboard("0 0 7px rgba(0, 0, 0, 0.15)")}
								style={{ width: 300, margin: 20 }}>
								<div className="Color Alt" style={{
									backgroundColor: "var(--tertiary-bg)",
									boxShadow: "0 0 7px rgba(0, 0, 0, 0.15)"
								}}>
									<div className="Color">0 0 7px rgba(0, 0, 0, 0.15)</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">Primary</div>
						</div>

						<div className="Block">
							<div className="ColorContainer" onClick={() => copyToClipboard("0 0 12px rgba(0, 0, 0, 0.2)")}
								style={{ width: 300, margin: 20 }}>
								<div className="Color Alt" style={{
									backgroundColor: "var(--tertiary-bg)",
									boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)"
								}}>
									<div className="Color">0 0 12px rgba(0, 0, 0, 0.2)</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">Secondary</div>
						</div>

						<div className="Block">
							<div className="ColorContainer" onClick={() => copyToClipboard("0 0 15px rgba(0, 0, 0, 0.25)")}
								style={{ width: 300, margin: 20 }}>
								<div className="Color Alt" style={{
									backgroundColor: "var(--tertiary-bg)",
									boxShadow: "0 0 15px rgba(0, 0, 0, 0.25)"
								}}>
									<div className="Color">0 0 15px rgba(0, 0, 0, 0.25)</div>
									<div className="Hover"><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">Tertiary</div>
						</div>
					</PaletteBlock>

					<PaletteBlock
						title="Font Families"
						description={`Any font will do, but these are the fonts used on this site.
								  Primary should be used as the base, which mostly everything will use.
								  Secondary should be used on descriptions and the like; to give a softer feel.`}
						custom
					>
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
					</PaletteBlock>

					<PaletteBlock
						title="Be Creative!"
						description={`Use and apply your own creativity to the theme;
						Everything does not have to be black and white~`}
						custom
					/>

					<PaletteBlock
						title="The Story"
						custom
					>
						<div className="Description">
							Since I was a kid, I've always loved cities,<br />
							gloomy weather, and the cyberpunk aesthetic.<br /><br />

							I grew up in a small town in the middle of nowhere,<br />
							always fascinated by cities and technology.<br /><br />

							For a few months before creating this theme,<br />
							I was pondering ideas for my first color palette.<br />
							I'd tried many different color schemes, but none of them<br />
							felt right to me.<br />
							Then, I had the idea of creating a cyberpunk-esque palette.<br /><br />

							I spent a few months creating the palette, and I was hooked;<br />
							this theme had the perfect look and feel for my liking.<br /><br />

							I've always felt that dark themes generally feel "too dark",<br />
							while light themes are painful to the eyes.<br />
							This theme strives to give a grey and soft feel; the perfect middle.<br /><br />

							The way you use the theme can greatly alter the feel/aesthetic;<br />
							for example, this site is meant to give a gloomy but inspiring feel,<br />
							while <a href="https://kinzoku.one">my personal site</a> is meant to give a calming and uplifting feel.<br /><br />
						</div>
					</PaletteBlock>

					<PaletteBlock
						title="Inspiration"
						description={`These are some images that inspired me when creating city fog.`}
						custom

						style={{
							maxWidth: 800
						}}
					>
						<div className="ImageBlock">
							<img
								className="Image"
								src="https://images.unsplash.com/photo-1580207868427-f019836acf26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
							/>

							<div className="Author">
								by <a href="https://unsplash.com/@nngvandenberg" className="Author">
									Nick van den Berg
								</a>
							</div>
						</div>

						<div className="ImageBlock">
							<img
								className="Image"
								src="https://images.unsplash.com/photo-1583190299014-883b05791ae0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1219&q=80"
							/>

							<div className="Author">
								by <a href="https://unsplash.com/@leyy" className="Author">
									Leyre .
								</a>
							</div>
						</div>

						<div className="ImageBlock">
							<img
								className="Image"
								src="https://images.unsplash.com/photo-1581441379020-247e49a30452?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"
							/>

							<div className="Author">
								by <a href="https://unsplash.com/@akaunas" className="Author">
									Alexander Kaunas
								</a>
							</div>
						</div>

						<div className="ImageBlock">
							<img
								className="Image"
								src="https://images.unsplash.com/photo-1520052205864-92d242b3a76b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80"
							/>

							<div className="Author">
								by <a href="https://unsplash.com/@meiying" className="Author">
									Meiying Ng
								</a>
							</div>
						</div>
					</PaletteBlock>
				</div>
			</div>
		</div>
	);
}