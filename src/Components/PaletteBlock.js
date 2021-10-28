import React from "react";
import { Clipboard } from "react-feather";
import { copyToClipboard } from "../Pages/Home";
import "./PaletteBlock.scss";

export default function PaletteBlock({ title, description, children, width = null, textColor = null, shadows = true, custom = false, ...props }) {
	const colors = custom ? null : children.split(/\s/gm);

	return (
		<div className="PaletteBlock" {...props}>
			<div className="TitleBarMockup FlexCenter">
				<div className="Title">
					{title}
				</div>

				<div className="Buttons FlexCenter">
					<div className="Button Minimize" />
					<div className="Button Restore" />
					<div className="Button Close" />
				</div>
			</div>

			<div className="TextContainer">
				<div className="Description">{description}</div>
			</div>

			<div className="Blocks">
				{custom ? children : (
					colors.map((color, i) => (
						color = { hex: color.split(":")[1], name: color.split(":")[0] },
						<div className="Block" key={i} onClick={() => copyToClipboard(color.hex)}>
							<div className="ColorContainer"
								style={{ width }}>
								<div className="Color" style={{ backgroundColor: color.hex, boxShadow: shadows ? null : "none" }}>
									<div style={{ color: textColor }}>{color.hex}</div>
									<div className="Hover" style={{ color: textColor }}><Clipboard /></div>
								</div>
							</div>
							<div className="Hex">{color.name}</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}