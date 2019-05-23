import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night_bright';

import './MarkdownEditor.css';
import { CodeBlock, Blank } from '../utility';

const MarkdownEditor = props => {
  const { value, title, help, onChange, hidePreview, height } = props;
  // if the type isn't specified, hidden!
  return (
    <div className={`markdown-container ${title === '' ? 'markdown-hidden' : 'markdown-shown'}`}>
      <h2>{title}</h2>
      <p>{help}</p>
      <div className="markdown-editor" title="I support Markdown!">
        <AceEditor
          mode="markdown"
          theme="tomorrow_night_bright"
          value={value}
          height={height}
          onChange={val => onChange(val)}
          setOptions={{ autoScrollEditorIntoView: true }}
          editorProps={{ $blockScrolling: true }}
          width={!hidePreview ? '45%' : '90%'}
          className="code-editor"
          fontSize={18}
          wrapEnabled
        />
        <div className="markdown-preview">
          {!hidePreview ? (
            <Markdown source={value} renderers={{ code: CodeBlock, delete: Blank }} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hidePreview: PropTypes.bool,
  height: PropTypes.string
};

MarkdownEditor.defaultProps = {
  title: '',
  help: '',
  hidePreview: false,
  height: '500px'
};

export default MarkdownEditor;
