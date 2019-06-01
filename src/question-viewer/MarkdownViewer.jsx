import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock, Blank } from '../utility';

import '../utility/MarkdownArea.css';

const MarkdownViewer = props => {
  const { value, className } = props;
  if (value === '') {
    return null;
  }
  return (
    <div className={`markdown-preview ${className}`}>
      <Markdown source={value} renderers={{ code: CodeBlock, delete: Blank }} />
    </div>
  );
};

MarkdownViewer.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string
};

MarkdownViewer.defaultProps = {
  value: '',
  className: ''
};

export default MarkdownViewer;
