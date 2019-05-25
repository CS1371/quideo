import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';

import '../utility/MarkdownArea.css';

import './ShortAnswer.css';

export default class ShortAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      userAnswer: '',
      showAnswer: false
    };
  }

  render() {
    const { prompt, answer } = this.props;
    const { userAnswer, showAnswer } = this.state;

    return (
      <div className="short-answer-view">
        <div className="markdown-preview">
          <Markdown source={prompt} renderers={{ code: CodeBlock }} />
        </div>
        <div className={`short-answer-area ${showAnswer ? 'show-answer' : 'hide-answer'}`}>
          <div className="short-user">
            <textarea
              onChange={v => {
                this.setState({
                  userAnswer: v
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
        <button
          type="button"
          className="btn-show-answer"
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
