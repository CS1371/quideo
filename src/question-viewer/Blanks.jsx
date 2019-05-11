import React from 'react';
import PropTypes from 'prop-types';
import ShortAnswer from './ShortAnswer';

// For every answer, we have a blank (prompt)

const Blanks = props => {
  const { answers } = props;
  const prompts = Array.from(Array(answers.length).keys()).map(e => {
    return {
      text: `Blank \\#**${e + 1}**`,
      isCode: false
    };
  });
  return <ShortAnswer answers={answers} prompts={prompts} />;
};

Blanks.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Blanks;
