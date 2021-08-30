import React from "react";
import "./PaletteBlock.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { copyToClipboard } from "../Pages/Home";

export default function PaletteBlock({ title, description, children, width = null, textColor = null , shadows = true}) {
    const colors = children.split(/\s/gm);
    
    return (
        <div className="PaletteBlock">
            <div className="Title">{title}</div>
            <div className="Description">{description}</div>
            
            <div className="Blocks">
                { colors.map((color, i) => (
                    color = { hex: color.split(":")[1], name: color.split(":")[0] },
                    <div className="Block" key={i} onClick={() => copyToClipboard(color.hex)}>
                        <div className="ColorContainer"
                             style={{ width }}>
                            <div className="Color" style={{ backgroundColor: color.hex, boxShadow: shadows ? null : "none" }}>
                                <div style={{ color: textColor }}>{color.hex}</div>
                                <div className="Hover" style={{ color: textColor }}><FontAwesomeIcon icon={faClipboard}/></div>
                            </div>
                        </div>
                        <div className="Hex">{color.name}</div>
                    </div>
                )) }
            </div>
        </div>
    );
}