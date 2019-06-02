import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownViewer } from '../utility';

import './Rubric.css';

const Rubric = props => {
  const { text, isShown } = props;
  if (!isShown) {
    return null;
  }
  return (
    <div className="rubric markdown-preview">
      <MarkdownViewer value={text} />
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
