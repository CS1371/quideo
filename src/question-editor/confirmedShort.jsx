import React from 'react';
import hash from 'object-hash';
import Markdown from 'react-markdown';

import { CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';
import './confirmedShort.css';

const renderAnswer = answer => {
  return (
    <div className="confirmed-prompt-answer markdown-preview">
      <Markdown source={answer} renderers={{ code: CodeBlock }} />
    </div>
  );
};

const confirmedShort = (n, i, sa) => {
  const { value, onChange } = sa.props;
  const { prompt, answer } = n;
  return (
    <div key={hash(n)} className="single-prompt">
      <div className="prompt-view">
        <div className="prompt markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        {renderAnswer(answer)}
      </div>
      <button
        type="button"
        className="prompt-edit-btn"
        onClick={() => {
          sa.setState(n);
          value.splice(i, 1);
          onChange(value);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default confirmedShort;
