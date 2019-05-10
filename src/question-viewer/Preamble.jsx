import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';
import './Preamble.css';

const Preamble = props => {
  const { preamble } = props;
  return (
    <div className="question-preamble">
      <Markdown source={preamble} renderers={{ code: CodeBlock }} />
    </div>
  );
};

Preamble.propTypes = {
  preamble: PropTypes.string.isRequired
};

export default Preamble;
