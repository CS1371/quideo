import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from './CodeBlock';
import Blank from './Blank';

const MarkdownViewer = props => {
  const { value, className, alwaysShow } = props;
  if (value === '' && !alwaysShow) {
    return null;
  }
  return (
    <div className={`markdown-preview ${className}`}>
      <Markdown
        source={value}
        renderers={{ inlineCode: CodeBlock, code: CodeBlock, delete: Blank }}
      />
    </div>
  );
};

MarkdownViewer.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  alwaysShow: PropTypes.bool
};

MarkdownViewer.defaultProps = {
  value: '',
  className: '',
  alwaysShow: false
};

export default MarkdownViewer;
