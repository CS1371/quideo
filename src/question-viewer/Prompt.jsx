import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { CodeBlock } from '../utility';
import HintList from './HintList';
import '../utility/MarkdownArea.css';
import './Prompt.css';

export default class Prompt extends React.Component {
  static propTypes = {
    prompt: PropTypes.shape({
      prompt: PropTypes.string.isRequired,
      isCode: PropTypes.bool.isRequired
    }).isRequired,
    answer: PropTypes.string.isRequired,
    header: PropTypes.node,
    hints: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    header: null,
    hints: []
  };

  constructor(props) {
    super(props);

    this.state = {
      showAnswer: false,
      userAnswer: ''
    };
  }

  renderAnswer = () => {
    const { userAnswer } = this.state;
    return (
      <div className="answer">
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
      </div>
    );
  };

  render() {
    const { showAnswer } = this.state;
    const { prompt, answer, hints, header } = this.props;
    return (
      <div className="prompt-answer">
        <div className="prompt-question">
          {header}
          <div className="prompt markdown-preview">
            <Markdown source={prompt.prompt} renderers={{ code: CodeBlock }} />
          </div>
        </div>
        <div className="header-invisible">
          <div>{header}</div>
          {this.renderAnswer()}
          <div className={`actual-answer markdown-preview ${showAnswer ? 'show-answer' : ''}`}>
            <Markdown source={answer} renderers={{ code: CodeBlock }} />
          </div>
        </div>
        <div className="prompt-buttons">
          <div className="hint-container">
            <HintList hints={hints} />
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
      </div>
    );
  }
}
