import React from 'react';
import PropTypes from 'prop-types';

import './AnswerButton.css';

const AnswerButton = props => {
  const { handler, showAnswer } = props;
  return (
    <button className="btn-show-answer" type="button" onClick={handler}>
      {showAnswer ? 'Hide Answer' : 'Show Answer'}
    </button>
  );
};

AnswerButton.propTypes = {
  handler: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool
};

AnswerButton.defaultProps = {
  showAnswer: false
};

export default AnswerButton;
