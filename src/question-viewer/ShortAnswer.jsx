import React from 'react';
import PropTypes from 'prop-types';
import hash from 'object-hash';
import Prompt from './Prompt';
// For each prompt, we have an answer. The preamble
// is already written, but each part has a prompt!

const ShortAnswer = props => {
  // For each one, add a prompt/answer pair.
  const { prompts, answers, hints } = props;
  // map each one to a prompt/answer with hints
  return prompts.map((p, ind) => (
    <Prompt
      key={hash(p.prompt)}
      prompt={p}
      answer={answers[ind]}
      hints={hints.length === 0 ? [] : hints[ind]}
    />
  ));
};

ShortAnswer.propTypes = {
  prompts: PropTypes.arrayOf(
    PropTypes.shape({
      prompt: PropTypes.string.isRequired,
      isCode: PropTypes.bool.isRequired
    })
  ).isRequired,
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  hints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

ShortAnswer.defaultProps = {
  hints: []
};

export default ShortAnswer;
