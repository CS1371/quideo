import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import HintList from './HintList';
import Option from './Option';
import { MultipleChoiceAnswer as Answer } from '../utility';
import './MultipleChoice.css';

const MultipleChoice = props => {
  const { answers, hints } = props;
  return (
    <React.Fragment>
      <p>Click the answer you think is correct</p>
      <div className="mc-question">
        <div className="mc-answers">
          {answers.map(ans => (
            <Option key={hash(ans.answer)} {...ans} />
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
  answers: PropTypes.arrayOf(Answer).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string)
};

MultipleChoice.defaultProps = {
  hints: []
};

export default MultipleChoice;
