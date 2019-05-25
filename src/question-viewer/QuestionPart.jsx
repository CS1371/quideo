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
  const { prompt, answer, hints, type, header } = props;
  let question = null;
  switch (type) {
    case TYPES.MC:
      question = <MultipleChoice prompt={prompt} answers={answer} />;
      break;
    case TYPES.SA:
      question = <ShortAnswer prompt={prompt} answer={answer} />;
      break;
    case TYPES.FB:
      question = <Blanks question={answer} />;
      break;
    case TYPES.CA:
      question = <CodingAnswer prompt={prompt} answer={answer} />;
      break;
    default:
      return null;
  }
  return (
    <div className="question-part">
      {header}
      {question}
      <HintList hints={hints} />
    </div>
  );
};

QuestionPart.propTypes = {
  header: PropTypes.node,
  ...QuestionType
};

QuestionPart.defaultProps = {
  header: null
};

export default QuestionPart;
