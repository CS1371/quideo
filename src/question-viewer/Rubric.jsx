import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { CodeBlock } from '../utility';
import '../utility/MarkdownArea.css';
import './Rubric.css';

const Rubric = props => {
  const { text, isShown } = props;
  if (!isShown) {
    return null;
  }
  return (
    <div className="rubric markdown-preview">
      <Markdown source={text} renderers={{ code: CodeBlock }} />
    </div>
  );
};

Rubric.propTypes = {
  text: PropTypes.string.isRequired,
  isShown: PropTypes.bool
};

Rubric.defaultProps = {
  isShown: false
};

export default Rubric;
