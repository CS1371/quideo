import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Markdown from 'react-markdown';
import HintList from './HintList';
import Option from './Option';
import { MultipleChoiceAnswer as Answer, CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';
import './MultipleChoice.css';

const MultipleChoice = props => {
  const { answers, hints, prompt } = props;
  return (
    <div className="multiple-choice-question">
      <div className="markdown-preview">
        <Markdown source={prompt} renderers={{ code: CodeBlock }} />
      </div>
      <p>Click the answer you think is correct</p>
      <div className="mc-answers">
        {answers.map(ans => (
          <Option key={hash(ans.answer)} {...ans} />
        ))}
      </div>
      <div>
        <HintList hints={hints} />
      </div>
    </div>
  );
};

MultipleChoice.propTypes = {
  prompt: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(Answer).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string)
};

MultipleChoice.defaultProps = {
  hints: []
};

export default MultipleChoice;
