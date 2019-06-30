import React from 'react';
import PropTypes from 'prop-types';
import MarkdownViewer from '../utility/MarkdownViewer';
import AnswerButton from './AnswerButton';

import './ShortAnswer.css';

export default class ShortAnswer extends React.Component {
  static propTypes = {
    prompt: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    hints: PropTypes.node,
    showAnswer: PropTypes.bool
  };

  static defaultProps = {
    hints: null,
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
    const { prompt, answer, showAnswer, hints } = this.props;
    const { userAnswer, toggleAnswer } = this.state;
    const shouldShow = showAnswer || toggleAnswer;
    return (
      <div className="short-answer-view">
        <MarkdownViewer value={prompt} className="short-prompt" />
        {hints}
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
          <MarkdownViewer value={answer} className="short-correct" />
        </div>
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
