import React from 'react';
import PropTypes from 'prop-types';

import '../utility/MarkdownArea.css';

import './Blanks.css';
import MarkdownEditor from './MarkdownEditor';

const Blanks = props => {
  const { value, onChange } = props;
  return (
    <div className="blank-edit">
      <MarkdownEditor value={value} onChange={onChange} title="Fill in the Blank Editor" />
    </div>
  );
};

Blanks.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Blanks;
