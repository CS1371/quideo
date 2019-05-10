import React from 'react';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import TextAreaAutosize from 'react-autosize-textarea';
import { CodeBlock, codeLines } from '../utility';
import './CodingAnswer.css';

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
