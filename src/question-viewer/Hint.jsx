import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownViewer } from '../utility';

import '../utility/MarkdownArea.css';
import './Hint.css';

const Hint = props => {
  const { text, isShown } = props;

  return (
    <li className={`question-hint markdown-preview ${isShown ? 'hint-show' : ''}`}>
      <MarkdownViewer value={text} />
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
