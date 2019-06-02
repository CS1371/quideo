import React from 'react';
import PropTypes from 'prop-types';
import { MarkdownViewer } from '../utility';

import './Preamble.css';

const Preamble = props => {
  const { value } = props;
  return (
    <div className="question-preamble markdown-preview">
      <MarkdownViewer value={value} />
    </div>
  );
};

Preamble.propTypes = {
  value: PropTypes.string.isRequired
};

export default Preamble;
