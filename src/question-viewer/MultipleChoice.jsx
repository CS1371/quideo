import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import HintList from './HintList';
import Option from './Option';
import './MultipleChoice.css';

const MultipleChoice = props => {
  const { answers, hints } = props;
  return (
    <React.Fragment>
      <p>Click the answer you think is correct</p>
      <div className="mc-question">
        <div className="mc-answers">
          {answers.map(ans => (
            <Option
              key={hash(ans.text)}
              text={ans.text}
              explanation={ans.explanation}
              isCorrect={ans.isCorrect}
            />
          ))}
        </div>
      </div>
      <div>
        <HintList hints={hints} />
      </div>
    </React.Fragment>
  );
};

MultipleChoice.propTypes = {
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      explanation: PropTypes.string,
      isCorrect: PropTypes.bool
    })
  ).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string)
};

MultipleChoice.defaultProps = {
  hints: []
};

export default MultipleChoice;
