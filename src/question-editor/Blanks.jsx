import React from 'react';
import PropTypes from 'prop-types';
import MarkdownEditor from './MarkdownEditor';

import './Blanks.css';

const Blanks = props => {
  const { value, onChange } = props;
  return (
    <div className="blank-edit">
      <MarkdownEditor
        value={value}
        onChange={onChange}
        title="Fill in the Blank Editor"
        help="Write your blanks with the answers included"
      />
    </div>
  );
};

Blanks.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Blanks;
