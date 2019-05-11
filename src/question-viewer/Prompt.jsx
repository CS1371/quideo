import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import TextAreaAutosize from 'react-autosize-textarea';
import { CodeBlock, codeLines } from '../utility';
import './Prompt.css';

const TAB_KEY = 9;
export default class Prompt extends React.Component {
  static propTypes = {
    prompt: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isCode: PropTypes.bool.isRequired
    }).isRequired,
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
    const { showAnswer, userAnswer } = this.state;
    const { prompt, answer } = this.props;

    // Depends on if we have code. If we do, then show 50/50. If we don't,
    // Then just show the text box as a whole.
    //
    // Regardless, when we show the answer, animate to half of what it was!
    let ans = null;
    let userArea = null;
    if (prompt.isCode) {
      // 50/50
      // with instructions...
      userArea = (
        <TextAreaAutosize
          value={userAnswer}
          placeholder="Type your code here..."
          rows={codeLines}
          onChange={e => {
            this.setState({
              userAnswer: e.target.value
            });
          }}
          onKeyDown={this.handleTab}
        />
      );
      ans = (
        <React.Fragment>
          <p>Your Code</p>
          <div className="user-answer code-editor">
            {userArea}
            <Markdown
              source={`\`\`\` matlab\n${userAnswer.replace(/^\s*`{3,}\s*$/g, '\n')}\n\`\`\``}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </React.Fragment>
      );
    } else {
      userArea = (
        <TextAreaAutosize
          value={userAnswer}
          placeholder="Type your answer here..."
          onChange={e => {
            this.setState({
              userAnswer: e.target.value
            });
          }}
          onKeyDown={this.handleTab}
        />
      );
      ans = <div className="user-answer">{userArea}</div>;
    }
    return (
      <div className="prompt-answer">
        <div className="prompt">
          <Markdown
            source={prompt.text}
            disallowedTypes={['thematicBreak']}
            rawSourcePos
            sourcePos
            includeNodeIndex
            renderers={{ code: CodeBlock }}
          />
        </div>
        <div className={`answer ${showAnswer ? 'show-answer' : ''}`}>
          {ans}
          <div className="actual-answer">
            <p>Solution</p>
            <Markdown source={answer} renderers={{ code: CodeBlock }} />
          </div>
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
