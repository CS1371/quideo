import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';
import HintList from './HintList';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import '../utility/MarkdownArea.css';
import './CodingAnswer.css';

export default class CodingAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string),
    showAnswer: PropTypes.bool
  };

  static defaultProps = {
    hints: [],
    showAnswer: false
  };

  constructor(props) {
    super(props);

    this.state = {
      toggleAnswer: false,
      userAnswer: ''
    };
  }

  renderEditors = () => {
    const { toggleAnswer, userAnswer } = this.state;
    const { answer, showAnswer } = this.props;
    const shouldShow = showAnswer || toggleAnswer;
    const editorProps = {
      mode: 'matlab',
      theme: 'sqlserver',
      editorProps: { $blockScrolling: Infinity },
      fontSize: 18,
      width: '45%'
    };
    return (
      <div className={`code-area ${shouldShow ? 'answer-show' : 'answer-hide'}`}>
        <AceEditor
          value={userAnswer}
          onChange={val => {
            this.setState({
              userAnswer: val
            });
          }}
          className="code-editor"
          {...editorProps}
        />
        <AceEditor value={answer} className="answer-code-viewer" readOnly {...editorProps} />
      </div>
    );
  };

  render() {
    const { toggleAnswer } = this.state;
    const { showAnswer, prompt, hints } = this.props;
    const shouldShow = showAnswer || toggleAnswer;
    return (
      <div className="coding-answer">
        <div className="markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        <p>Type your code below. When ready, press Show Answer to compare</p>
        {this.renderEditors()}
        <HintList hints={hints} />
        {showAnswer ? null : (
          <button
            type="button"
            className="btn-answer"
            onClick={() => {
              this.setState({
                toggleAnswer: !toggleAnswer
              });
            }}
          >
            {shouldShow ? 'Hide Answer' : 'Show Answer'}
          </button>
        )}
      </div>
    );
  }
}
