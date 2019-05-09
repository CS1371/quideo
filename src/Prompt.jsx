import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import TextAreaAutosize from 'react-autosize-textarea';
import CodeBlock from './CodeBlock';
import './Prompt.css';

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

  render() {
    const { showAnswer, userAnswer } = this.state;
    const { prompt, answer } = this.props;
    const userArea = (
      <TextAreaAutosize
        value={userAnswer}
        placeholder="Type your answer here..."
        onChange={e => {
          this.setState({
            userAnswer: e.target.value
          });
        }}
      />
    );
    // Depends on if we have code. If we do, then show 50/50. If we don't,
    // Then just show the text box as a whole.
    //
    // Regardless, when we show the answer, animate to half of what it was!
    let ans = null;
    if (prompt.isCode) {
      // 50/50
      // with instructions...
      ans = (
        <React.Fragment>
          <div className="user-answer code-editor">
            {userArea}
            <Markdown
              source={`\`\`\` matlab\n${userAnswer}\n\`\`\``}
              renderers={{ code: CodeBlock }}
            />
          </div>
        </React.Fragment>
      );
    } else {
      ans = <div className="user-answer">{userArea}</div>;
    }
    return (
      <div className="prompt-answer">
        <div className="prompt">
          <Markdown source={prompt.text} renderers={{ code: CodeBlock }} />
        </div>
        <div className={`answer ${showAnswer ? 'show-answer' : ''}`}>
          {ans}
          <div className="actual-answer">
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
