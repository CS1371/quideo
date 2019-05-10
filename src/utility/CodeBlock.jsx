import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/prism';
import './CodeBlock.css';

export class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    language: PropTypes.string
  };

  static defaultProps = {
    language: 'matlab',
    value: ''
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter
        className="code-block"
        customStyle={{ padding: '', margin: '' }}
        showLineNumbers
        language={language}
        style={darcula}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export const codeLines = 10;
