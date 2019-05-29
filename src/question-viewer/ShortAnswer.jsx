import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';
import './ShortAnswer.css';

export default class ShortAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    showAnswer: PropTypes.bool
  };

  static defaultProps = {
    showAnswer: false
  };

  constructor(props) {
    super(props);

    this.state = {
      userAnswer: '',
      toggleAnswer: false
    };
  }

  render() {
    const { prompt, answer, showAnswer } = this.props;
    const { userAnswer, toggleAnswer } = this.state;
    const shouldShow = showAnswer || toggleAnswer;
    return (
      <div className="short-answer-view">
        <div className="short-prompt markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        <div className={`short-answer-area ${shouldShow ? 'show-answer' : 'hide-answer'}`}>
          <div className="short-user">
            <textarea
              onChange={v => {
                this.setState({
                  userAnswer: v.target.value
                });
              }}
              value={userAnswer}
              placeholder="Type your answer here..."
            />
          </div>
          <div className="short-correct markdown-preview">
            <Markdown source={answer} renderers={{ code: CodeBlock }} />
          </div>
        </div>
        {showAnswer ? null : (
          <button
            type="button"
            className="btn-show-answer"
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
