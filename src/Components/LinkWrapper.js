import React from "react";
import "./LinkWrapper.scss";

export default class extends React.Component {
	render() {
		return (
			<a className="LinkWrapper" {...this.props}>
				{ this.props.children }
			</a>
		);
	}
}