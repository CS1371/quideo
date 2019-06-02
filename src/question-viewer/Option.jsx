import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentCheck, faCommentTimes } from '@fortawesome/pro-solid-svg-icons';
import { CodeBlock } from '../utility';

import './Option.css';

// NOTE: We explicitly are NOT importing MarkdownViewer - the option
// Markdown needs are extremely specific.
export default class Option extends React.Component {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    explanation: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    handler: PropTypes.func,
    shouldExpand: PropTypes.bool
  };

  static defaultProps = {
    handler: null,
    shouldExpand: false
  };

  constructor(props) {
    super(props);

    this.state = {
      isChosen: false
    };
  }

  render() {
    const { isChosen } = this.state;
    const { answer, explanation, isCorrect, shouldExpand, handler } = this.props;
    const eClass = isChosen || shouldExpand ? 'mc-chosen' : '';

    return (
      <div className={`mc-option ${isCorrect ? 'mc-correct' : 'mc-incorrect'} ${eClass}`}>
        <button
          className="mc-answer"
          type="button"
          onClick={() => {
            if (handler) {
              handler();
            }
            this.setState({
              isChosen: !isChosen
            });
          }}
        >
          <Markdown source={answer} renderers={{ code: CodeBlock }} />
        </button>
        <button
          type="button"
          className="mc-explanation"
          onClick={() => {
            handler();
            this.setState({
              isChosen: !isChosen
            });
          }}
        >
          <FontAwesomeIcon icon={isCorrect ? faCommentCheck : faCommentTimes} />
          <Markdown source={explanation} renderers={{ code: CodeBlock }} />
        </button>
      </div>
    );
  }
}
