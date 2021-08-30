import React from "react";
import "./Toasts.scss";
import { getRandomKey, joinClassNames } from "../Classes/Constants";
import Timer from "../Classes/TimerClass";

export function Toast({ children, type, life, remove, callback, color, fixedTime = false }) {
	const handleRemove = () => {
		setClosing(true);

		setTimeout(remove, 500);
	};
	
	const [closing, setClosing] = React.useState(false);
	const timer = React.useMemo(() => new Timer(handleRemove, life * 1000, false), []);
	const progressBar = React.useRef();
	
	const handleMouseEnter = () => {
		timer.pause();
		progressBar.current.style.animationPlayState = "paused";
	};
	
	const handleMouseLeave = () => {
		timer.resume();
		progressBar.current.style.animationPlayState = "running";
	};
	
	React.useEffect(() => {
		const handleFocus = () => !fixedTime && handleMouseLeave();
		const handleBlur = () => !fixedTime && handleMouseEnter();
		
		window.addEventListener("focus", handleFocus);
		window.addEventListener("blur", handleBlur);
		
		(fixedTime || document.hasFocus()) && handleMouseLeave();
		
		return () => {
			window.removeEventListener("focus", handleFocus);
			window.removeEventListener("blur", handleBlur);
		};
	});
	
	return (
		<div className={joinClassNames("Toast", [closing, "Closing"], type)}
			 onMouseEnter={fixedTime ? null : handleMouseEnter}
			 onMouseLeave={fixedTime ? null : handleMouseLeave}
			 onClick={callback ? e => { callback(e); timer.end(); } : () => { timer.end(); }}
			 style={{ cursor: callback ? "pointer" : null, backgroundColor: color }}>
			{ children }

			<div className="ProgressBarContainer">
				<div ref={progressBar} className="ProgressBar" style={{ animationDuration: life + "s" }}/>
			</div>
		</div>
	);
}

export default class Toasts extends React.Component {
	static instance;
	static ref = React.createRef();
	
	state = { toasts: [] };

	componentDidMount() {
		Toasts.instance = this;
	}
	
	static showToast(children, type = "", life = 5, additionalOptions = {}) {
		const { callback = null, color = null, fixedTime = false } = additionalOptions;
		
		const toast = React.createElement(Toast, {
			key: getRandomKey(),
			children, type, life, color, fixedTime,
			remove: () => {
				this.instance.setState({ toasts: this.instance.state.toasts.filter(t => t !== toast) });
			},
			callback
		});

		this.instance.setState({ toasts: [ ...this.instance.state.toasts, toast ] });
		return toast;
	}
	
	get horizontalStyle() {
		return "Center";
		
		// switch (Settings.props.notifications.toasts.positionX) {
		// 	case 0:
		// 		return "Left";
		// 	case 1:
		// 		return "Center";
		// 	case 2:
		// 		return "Right";
		// }
	}
	
	get verticalStyle() {
		return "Bottom";
		
		// switch (Settings.props.notifications.toasts.positionY) {
		// 	case 0:
		// 		return "Top";
		// 	case 1:
		// 		return "Bottom";
		// }
	}

	render() {
		return (
			<div ref={Toasts.ref} className={joinClassNames("ToastsContainer", this.horizontalStyle, this.verticalStyle)}>
				<div className={joinClassNames("ClearButton", [!!this.state.toasts?.length, "Visible"])} onClick={() => this.setState({ toasts: [] })}>
					<u>Close all</u>
				</div>
				
				{ this.state.toasts }
			</div>
		);
	}
}