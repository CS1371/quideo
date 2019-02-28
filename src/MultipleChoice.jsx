import React from "react";
import PropTypes from "prop-types";
import "./MultipleChoice.css";
export default class MultipleChoice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChosen: false
        };
    }
    render() {
        const options = [];
        const eClass = this.state.isChosen ? "mc-chosen" : "";
        for (const [ind, a] of this.props.answers.entries()) {
            options.push(
                <div className="mc-option">
                    <button
                        className={"mc-answer " + eClass}
                        key={"mc-question-" + ind}
                        onClick={() => {
                            this.setState({
                                isChosen: !this.state.isChosen
                            });
                        }}>
                        {a.text}
                    </button>
                    <p className={"mc-explanation " + eClass}>
                        Hi there! I'm an explanation
                    </p>
                </div>
            );
        }
        return (
            <div className="mc-question">
                <div className="mc-answers">
                    {options}
                </div>
            </div>
        );
    }
}

MultipleChoice.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        isCorrect: PropTypes.bool.isRequired
    }))
};