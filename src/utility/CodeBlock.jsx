import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import matlab from './matlab';
import Blank from './lineRenderer';

import './CodeBlock.css';

export class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  };

  static defaultProps = {
    language: '',
    value: ''
  };

  render() {
    const { language, value } = this.props;
    // if in command window OR only one line, no new lines
    const blankValue = value.replace(/~~![^~]+!~~/g, '%{$&}%');
    if (language !== 'matlab') {
      return (
        <SyntaxHighlighter
          className="code-block"
          customStyle={{ padding: '', margin: '', whiteSpace: '' }}
          language="plain"
          style={matlab}
          renderer={Blank}
        >
          {blankValue}
        </SyntaxHighlighter>
      );
    }
    return (
      <SyntaxHighlighter
        className="code-block"
        customStyle={{ padding: '', margin: '', whiteSpace: '' }}
        showLineNumbers
        language={language}
        style={matlab}
        renderer={Blank}
      >
        {blankValue}
      </SyntaxHighlighter>
    );
  }
}

export const codeLines = 10;
