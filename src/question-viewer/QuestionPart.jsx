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
  const { prompt: p, answer: ans, hints, type: t, header: h, showAnswer: s } = props;
  let question = null;
  const hintList = <HintList hints={hints} showAll={s} />;
  switch (t) {
    case TYPES.MC:
      question = <MultipleChoice showAnswer={s} prompt={p} answers={ans} hints={hintList} />;
      break;
    case TYPES.SA:
      question = <ShortAnswer showAnswer={s} prompt={p} answer={ans} hints={hintList} />;
      break;
    case TYPES.FB:
      question = <Blanks showAnswer={s} question={ans} hints={hintList} />;
      break;
    case TYPES.CA:
      question = <CodingAnswer showAnswer={s} prompt={p} answer={ans} hints={hintList} />;
      break;
    default:
      return null;
  }
  return (
    <div className={`question-part ${s ? 'should-show' : ''}`}>
      {h}
      {question}
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
