import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import { Preamble as Viewer } from '../question-viewer';

import 'brace/mode/markdown';
import 'brace/theme/tomorrow_night_bright';

import './Preamble.css';

const Preamble = props => {
  const { value, onChange } = props;
  return (
    <div className="preamble-editor">
      <AceEditor
        mode="markdown"
        theme="tomorrow_night_bright"
        value={value}
        onChange={val => onChange(val)}
        setOptions={{ autoScrollEditorIntoView: true }}
        editorProps={{ $blockScrolling: true }}
        width="45vw"
        className="code-editor"
        fontSize={18}
      />
      <Viewer preamble={value} />
    </div>
  );
};

Preamble.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Preamble;
