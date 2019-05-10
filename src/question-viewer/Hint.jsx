import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { CodeBlock } from '../utility/CodeBlock';
import './Hint.css';

const Hint = props => {
  const { text, isShown } = props;

  return (
    <li className={`question-hint ${isShown ? 'hint-show' : ''}`}>
      <Markdown source={text} renderers={{ code: CodeBlock }} />
    </li>
  );
};

Hint.propTypes = {
  text: PropTypes.string.isRequired,
  isShown: PropTypes.bool
};

Hint.defaultProps = {
  isShown: false
};

export default Hint;
