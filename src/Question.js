import "./Question.css";
import React from "react";
import Tag from "./Tag";
import PropTypes from "prop-types";

export default class Question extends React.Component {
    /* Props:
    * topic
    * index
    * difficulty
    * type
    * hints
    * prompt
    * answers
    * tags
    */

    render() {
        // for each of our tags, print
        const tags = [];
        for (let t of this.props.tags) {
            tags.push(<Tag name={t.name}/>);
        }
        const difficulties = [
            "Cream Cheese",
            "Mild",
            "Medium",
            "Spicy",
            "Habenero"
        ];
        const difficulty = difficulties[this.props.difficulty];

        // print like this:
        // Topic - Index - Difficulty
        // Tags (as boxes?)
        return (
            <div className="question-view">
                <div className="question-title">
                    <h2>{this.props.topic + ": " + this.props.index + " (" + this.props.type + " - " + difficulty + ")"}</h2>
                </div>
                <div className="question-tags">
                    {tags}
                </div>
            </div>
        );
    }
}
Question.propTypes = {
    topic: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    })),
    preamble: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.shape({
        index: PropTypes.number.isRequired,
        prompt: PropTypes.number.isRequired
    })),
    prompt: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired
    })),
    // make required!

    answers: PropTypes.arrayOf(PropTypes.Object)
};