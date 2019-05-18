import React from 'react';
import PropTypes from 'prop-types';
import ShortAnswer from './ShortAnswer';

// For every answer, we have a blank (prompt)

const Blanks = props => {
  const { answers, hints } = props;
  const prompts = Array.from(Array(answers.length).keys()).map(e => {
    return {
      prompt: `Blank \\#**${e + 1}**`,
      isCode: false
    };
  });
  return <ShortAnswer answers={answers} prompts={prompts} hints={hints} />;
};

Blanks.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  hints: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

Blanks.defaultProps = {
  hints: []
};

export default Blanks;
