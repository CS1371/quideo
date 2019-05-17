import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';
import './Preamble.css';

const Preamble = props => {
  const { value } = props;
  return (
    <div className="question-preamble">
      <Markdown source={value} renderers={{ code: CodeBlock }} />
    </div>
  );
};

Preamble.propTypes = {
  value: PropTypes.string.isRequired
};

export default Preamble;
