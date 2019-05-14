import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';
import CodingAnswer from './CodingAnswer';
import HintList from './HintList';
import './Prompt.css';

export default class Prompt extends React.Component {
  static propTypes = {
    prompt: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isCode: PropTypes.bool.isRequired
    }).isRequired,
    answer: PropTypes.string.isRequired,
    hints: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    hints: []
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
    const { prompt, answer, hints } = this.props;
    // If we have code, just use the codingAnswer?
    if (prompt.isCode) {
      return (
        <React.Fragment>
          <div className="prompt-answer">
            <div className="prompt">
              <Markdown source={prompt.text} renderers={{ code: CodeBlock }} />
            </div>
            <CodingAnswer answer={answer} hints={hints} />
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="prompt-answer">
        <div className="prompt">
          <Markdown source={prompt.text} renderers={{ code: CodeBlock }} />
        </div>
        <div className={`answer ${showAnswer ? 'show-answer' : ''}`}>
          <textarea
            className="user-answer"
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={e => {
              this.setState({
                userAnswer: e.target.value
              });
            }}
          />
          <div>
            <HintList hints={hints} />
          </div>
          <div className="actual-answer">
            <Markdown source={answer} renderers={{ code: CodeBlock }} />
          </div>
        </div>
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
