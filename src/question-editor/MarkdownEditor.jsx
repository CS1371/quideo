import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { Preamble as Viewer } from '../question-viewer';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night_bright';

import './MarkdownEditor.css';

const MarkdownEditor = props => {
  const { value, title, help, onChange, hidePreview } = props;
  // if the type isn't specified, hidden!
  return (
    <div className={`preamble-container ${title === '' ? 'preamble-hidden' : 'preamble-shown'}`}>
      <h2>{title}</h2>
      <p>{help}</p>
      <div className="preamble-editor">
        <AceEditor
          mode="markdown"
          theme="tomorrow_night_bright"
          value={value}
          onChange={val => onChange(val)}
          setOptions={{ autoScrollEditorIntoView: true }}
          editorProps={{ $blockScrolling: true }}
          width={!hidePreview ? '45%' : '90%'}
          className="code-editor"
          fontSize={18}
        />
        {!hidePreview ? <Viewer value={value} /> : null}
      </div>
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string,
  help: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hidePreview: PropTypes.bool
};

MarkdownEditor.defaultProps = {
  title: '',
  help: '',
  hidePreview: false
};

export default MarkdownEditor;
