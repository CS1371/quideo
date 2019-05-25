import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/matlab';
import 'brace/theme/sqlserver';
import Markdown from 'react-markdown';
import HintList from './HintList';
import { CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';
import './CodingAnswer.css';

export default class CodingAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    hints: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: null,
      userAnswer: ''
    };
  }

  renderEditors = () => {
    const { showAnswer, userAnswer } = this.state;
    const { answer } = this.props;
    const editorProps = {
      mode: 'matlab',
      theme: 'sqlserver',
      editorProps: { $blockScrolling: Infinity },
      fontSize: 18,
      width: '45%'
    };
    return (
      <div className={`code-area ${showAnswer ? 'answer-show' : 'answer-hide'}`}>
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
    const { showAnswer } = this.state;
    const { prompt, hints } = this.props;

    return (
      <div className="coding-answer">
        <div className="markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        <p>Type your code below. When ready, press Show Answer to compare</p>
        {this.renderEditors()}
        <HintList hints={hints} />
        <button
          type="button"
          className="btn-answer"
          onClick={() => {
            this.setState({
              showAnswer: !showAnswer
            });
          }}
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
    );
  }
}
