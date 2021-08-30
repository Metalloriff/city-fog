import React from "react";
import "./Tooltip.scss";
import { joinClassNames } from "../Classes/Constants";
import ReactDOM from "react-dom";

export default function Tooltip({ children, direction = "up", className = "", color, style, onClick }) {
    const [visible, setVisible] = React.useState(false);
    const ref = React.useRef();
    
    React.useEffect(() => {
        ref.current.parentElement.classList.add("HasTooltip");
        
        return () => {
            ref.current && ref.current.parentElement.classList.remove("HasTooltip");
        };
    }, [ children, direction ]);
    
    return (
        <div ref={ref} className={joinClassNames("TooltipContainer", direction.toLowerCase(), [visible, "Visible"], className)} style={style} onClick={onClick}>
            <div className="Tooltip" style={{ backgroundColor: color }}>{ children }</div>
            <div className="TooltipArrow" style={{ backgroundColor: color }}/>
        </div>
    );
}

export function DetachedTooltip({ children, direction = "up", className = "", color, style, onClick, parentRef }) {
    const container = React.useMemo(() => document.getElementsByClassName("AppMain")[0], []);
    const [visible, setVisible] = React.useState(false);
    const [styles, setStyles] = React.useState(null);
    const ref = React.useRef();

    React.useEffect(() => {
        const parent = parentRef.current;
        
        const events = {
            onMouseEnter: () => {
                if (visible) return;
                
                const rect = parent.getBoundingClientRect();
                const tooltipRect = ref.current.getBoundingClientRect();
                
                switch (direction) {
                    case "up":
                        setStyles({
                            top: rect.y - rect.height - tooltipRect.height,
                            left: rect.x + (rect.width / 2)
                        });
                        break;

                    case "left":
                        setStyles({
                            top: rect.y - (rect.height / 2) + ((tooltipRect.height * 1.25) / 3),
                            left: rect.x - (tooltipRect.width * 1.25)
                        });
                        break;
                        
                    case "down":
                        setStyles({
                            bottom: rect.y - (tooltipRect.height * 1.25),
                            left: rect.x - ((tooltipRect.width * 1.25) / 2) + (rect.width / 2)
                        });
                        break;
                        
                    case "right":
                        setStyles({
                            top: rect.y - ((tooltipRect.height * 1.25) / 2) + (rect.height / 2),
                            right: rect.x - tooltipRect.width - 5
                        });
                        break;
                }
                
                setVisible(true);
            },
            onMouseLeave: () => setVisible(false)
        };
        
        parent.addEventListener("mouseenter", events.onMouseEnter);
        parent.addEventListener("mouseleave", events.onMouseLeave);
        
        return () => {
            parent.removeEventListener("mouseenter", events.onMouseEnter);
            parent.removeEventListener("mouseleave", events.onMouseLeave);
        };
    }, [ children, direction ]);

    return ReactDOM.createPortal(
        <div ref={ref} className={joinClassNames("TooltipContainer Detached", direction.toLowerCase(), [visible, "Visible"], className)}
             style={{ ...(styles ?? {}), ...(style ?? {}) }} onClick={onClick}>
            <div className="Tooltip" style={{ backgroundColor: color }}>{ children }</div>
            <div className="TooltipArrow" style={{ backgroundColor: color }}/>
        </div>,
        container
    );
}