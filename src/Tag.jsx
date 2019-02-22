import React from "react";
import PropTypes from "prop-types";
import "./Tag.css";
const COLORS = [
    "red",
    "green",
    "blue",
    "orange",
    "black",
    "grey",
    "brown",
    "pastel-red",
    "pastel-green",
    "pastel-blue",
    "pastel-orange"
];

export default class Tag extends React.Component {
    // render as a button!
    render() {
        // if we aren't given a color, make one up
        const color = this.props.color !== "" ? 
            this.props.color :
            COLORS[Math.floor(Math.random() * COLORS.length)];
        return (
            <button
                className={"tag tag-" + color}>
                {this.props.name}
            </button>
        );
    }
}

Tag.defaultProps = {
    color: "red"
};
Tag.propTypes = {
    /** the name of this tag */
    name: PropTypes.string.isRequired,
    /** the color class to use. If not given, a random one is chosen */
    color: PropTypes.oneOf(COLORS)
};