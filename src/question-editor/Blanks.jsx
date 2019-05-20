import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import hash from 'object-hash';
import { CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';

import './Blanks.css';

const Blank = props => {
  const { preview, value, onChange } = props;
  return (
    <div className="blank-edit">
      <div className="markdown-area">
        <Markdown source={preview} renderers={{ code: CodeBlock }} />
      </div>
      <textarea className="blank-answer" value={value} onChange={onChange} />
    </div>
  );
};

Blank.propTypes = {
  preview: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const Blanks = props => {
  const { prompts, value, onChange } = props;

  const blanks = [];
  for (let i = 0; i < prompts.length; i++) {
    // Create our blanks
    const preview = prompts[i];
    blanks.push(
      <Blank
        key={hash(preview)}
        preview={preview}
        value={value[i]}
        onChange={v => {
          value[i] = v.target.value;
          onChange(value);
        }}
      />
    );
  }

  return blanks;
};

Blanks.propTypes = {
  prompts: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Blanks;
