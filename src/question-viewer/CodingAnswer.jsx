import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import MarkdownViewer from '../utility/MarkdownViewer';
import AnswerButton from './AnswerButton';

import 'brace/mode/matlab';
import 'brace/theme/sqlserver';

import './CodingAnswer.css';

export default class CodingAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool,
    hints: PropTypes.node
  };

  static defaultProps = {
    showAnswer: false,
    hints: null
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
        {showAnswer ? null : (
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
        )}
        <AceEditor value={answer} className="answer-code-viewer" readOnly {...editorProps} />
      </div>
    );
  };

  render() {
    const { toggleAnswer } = this.state;
    const { showAnswer, prompt, hints } = this.props;
    return (
      <div className="coding-answer">
        <MarkdownViewer value={prompt} />
        {hints}
        {showAnswer ? null : <p>Type your code below. When ready, press Show Answer to compare</p>}
        {this.renderEditors()}
        <AnswerButton
          handler={() => {
            this.setState({
              toggleAnswer: !toggleAnswer
            });
          }}
          showAnswer={showAnswer || toggleAnswer}
        />
      </div>
    );
  }
}
