import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import TextAreaAutosize from 'react-autosize-textarea';
import { CodeBlock, codeLines } from '../utility';
import './CodingAnswer.css';

const TAB_KEY = 9;

export default class CodingAnswer extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
      userAnswer: ''
    };
  }

  handleTab = e => {
    const { userAnswer } = this.state;
    if (e.keyCode === TAB_KEY) {
      // see how many spaces we have until four on current line
      // get current line
      let ind = userAnswer.lastIndexOf('\n');
      if (ind === -1) {
        // just get length, no new lines
        ind = userAnswer.length;
      } else {
        ind = userAnswer.length - ind - 1;
      }
      // mod ind with 4 to get left
      ind = 4 - (ind % 4);
      const newAnswer = userAnswer.padEnd(userAnswer.length + ind, ' ');
      this.setState({
        userAnswer: newAnswer
      });
      e.preventDefault();
    }
  };

  render() {
    // if showing answer, we want our code side by side with theirs. Otherwise,
    // show our textarea and their preview.
    const { showAnswer, userAnswer } = this.state;
    const { answer } = this.props;

    return (
      <div className="question-long">
        <p>Type your code below. When ready, press Show Answer to compare</p>
        <div className={`code-area ${showAnswer ? 'answer-show' : 'answer-hide'}`}>
          <TextAreaAutosize
            value={userAnswer}
            placeholder="Type your code here..."
            onChange={e => {
              this.setState({
                userAnswer: e.target.value
              });
            }}
            rows={codeLines}
            onKeyDown={this.handleTab}
          />
          <Markdown
            className="user-code-viewer"
            source={`\`\`\`matlab\n${userAnswer.replace(/^\s*`{3,}\s*$/g, '\n')}\n\`\`\``}
            renderers={{ code: CodeBlock }}
          />
          <Markdown
            className="answer-code-viewer"
            source={answer}
            renderers={{ code: CodeBlock }}
          />
        </div>
        <button
          type="button"
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
