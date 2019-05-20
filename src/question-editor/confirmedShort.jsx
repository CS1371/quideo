import React from 'react';
import hash from 'object-hash';
import Markdown from 'react-markdown';
import AceEditor from 'react-ace';

import { CodeBlock } from '../utility';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import '../utility/MarkdownArea.css';
import './confirmedShort.css';

const HEIGHT_MULT = 1.4;

const renderAnswer = (answer, isCode) => {
  if (isCode) {
    return (
      <div className="prompt-answer">
        <AceEditor
          value={answer}
          width="100%"
          fontSize={18}
          height={`${Math.min((answer.match(/\n/g) || '').length + 1, 20) * HEIGHT_MULT}em`}
          mode="matlab"
          theme="sqlserver"
          readOnly
          editorProps={{ $blockScrolling: Infinity }}
        />
      </div>
    );
  }
  return (
    <div className="prompt-answer markdown-preview">
      <Markdown source={answer} renderers={{ code: CodeBlock }} />
    </div>
  );
};

const confirmedShort = (n, i, sa) => {
  const { value, onChange } = sa.props;
  const { prompt, answer, isCode } = n;
  return (
    <div key={hash(n)} className="single-prompt">
      <div className="prompt-view">
        <div className="prompt markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        {renderAnswer(answer, isCode)}
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
