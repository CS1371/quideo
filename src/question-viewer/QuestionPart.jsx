import React from 'react';
import PropTypes from 'prop-types';
import { TYPES, Question as QuestionType } from '../utility';
import HintList from './HintList';
import MultipleChoice from './MultipleChoice';
import ShortAnswer from './ShortAnswer';
import Blanks from './Blanks';
import CodingAnswer from './CodingAnswer';

import './QuestionPart.css';

const QuestionPart = props => {
  const { prompt, answer, hints, type, header, showAnswer } = props;
  let question = null;
  switch (type) {
    case TYPES.MC:
      question = <MultipleChoice showAnswer={showAnswer} prompt={prompt} answers={answer} />;
      break;
    case TYPES.SA:
      question = <ShortAnswer showAnswer={showAnswer} prompt={prompt} answer={answer} />;
      break;
    case TYPES.FB:
      question = <Blanks showAnswer={showAnswer} question={answer} />;
      break;
    case TYPES.CA:
      question = <CodingAnswer showAnswer={showAnswer} prompt={prompt} answer={answer} />;
      break;
    default:
      return null;
  }
  return (
    <div className="question-part">
      {header}
      {question}
      <HintList hints={hints} showAll={showAnswer} />
    </div>
  );
};

QuestionPart.propTypes = {
  header: PropTypes.node,
  showAnswer: PropTypes.bool,
  ...QuestionType
};

QuestionPart.defaultProps = {
  header: null,
  showAnswer: false
};

export default QuestionPart;
