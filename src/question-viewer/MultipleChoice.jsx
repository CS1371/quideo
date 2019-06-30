import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import { MultipleChoiceAnswer as Answer } from '../utility';
import MarkdownViewer from '../utility/MarkdownViewer';
import Option from './Option';

import './MultipleChoice.css';

const MultipleChoice = props => {
  const { answers, prompt, showAnswer, hints } = props;
  return (
    <div className="multiple-choice-question">
      <MarkdownViewer value={prompt} />
      {hints}
      <p>
        <em>Click the answer you think is correct</em>
      </p>
      <div className="mc-answers">
        {answers.map(ans => (
          <Option key={hash(ans.answer)} {...ans} shouldExpand={showAnswer} />
        ))}
      </div>
    </div>
  );
};

MultipleChoice.propTypes = {
  prompt: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(Answer).isRequired,
  hints: PropTypes.node,
  showAnswer: PropTypes.bool
};

MultipleChoice.defaultProps = {
  showAnswer: false,
  hints: null
};

export default MultipleChoice;
