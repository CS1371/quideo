import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from './MarkdownEditor';

import '../utility/MarkdownArea.css';
import './ShortAnswer.css';
// Each prompt will either be code or free response (markdown)

const ShortAnswer = props => {
  const { value, onChange } = props;
  return (
    <div className="short-answer">
      <MarkdownEditor value={value} onChange={onChange} title="Answer" height="300px" />
    </div>
  );
};

ShortAnswer.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ShortAnswer;
