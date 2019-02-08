import "./Question.css";
import React from "react";
import Tag from "./Tag";

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
        // TODO: Convert to string
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
                    <h2>{this.props.topic + ": " + this.props.order + " (" + difficulty + ")"}</h2>
                </div>
                <div className="question-tags">
                    {tags}
                </div>
            </div>
        );
    }
}