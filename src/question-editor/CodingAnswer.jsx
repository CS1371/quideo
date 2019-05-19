import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import './CodingAnswer.css';

const CodingAnswer = props => {
  const { value, onChange, title, help } = props;
  return (
    <div className="coding-editor">
      <h2>{title}</h2>
      <p>{help}</p>
      <AceEditor
        mode="matlab"
        theme="sqlserver"
        value={value}
        onChange={onChange}
        editorProps={{ $blockScrolling: true }}
        fontSize={18}
        width="90%"
      />
    </div>
  );
};

CodingAnswer.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.node,
  help: PropTypes.node
};

CodingAnswer.defaultProps = {
  title: 'Coding Answer',
  help: 'Write your solution code as it would appear in MATLAB'
};

export default CodingAnswer;
