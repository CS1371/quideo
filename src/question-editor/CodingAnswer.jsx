import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import './CodingAnswer.css';

const CodingAnswer = props => {
  const { value, onChange } = props;
  return (
    <div className="coding-editor">
      <h2>Solution Code</h2>
      <p>Write your solution code as it would appear in MATLAB</p>
      <AceEditor
        mode="matlab"
        theme="sqlserver"
        value={value}
        onChange={onChange}
        editorProps={{ $blockScrolling: true }}
        width="90%"
      />
    </div>
  );
};

CodingAnswer.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CodingAnswer;
