import React from "react";
import PropTypes from "prop-types";

export default class MultipleChoice extends React.Component {
    render() {
        const options = [];
        for (const [ind, a] of this.props.answers.entries()) {
            options.push(
                <button
                    className="mc-answer"
                    key
                    onClick={() => {
                        // do something useful?
                        // It's possible we need to pass in the index?
                        console.log(ind);
                    }}>
                    {a.text}
                </button>
            );
        }
        return (
            <div className="mc-question">
                {options}
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